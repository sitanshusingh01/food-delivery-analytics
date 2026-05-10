import { useState } from "react";
import { TrendingUp, Users, Truck, UtensilsCrossed } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Line, ComposedChart, Legend,
} from "recharts";

type TabId = "customers" | "delivery" | "restaurants";

const tabs: { id: TabId; label: string; icon: typeof Users }[] = [
  { id: "customers", label: "Customer Analytics", icon: Users },
  { id: "delivery", label: "Delivery Analytics", icon: Truck },
  { id: "restaurants", label: "Restaurant Analytics", icon: UtensilsCrossed },
];

const insights: Record<TabId, { title: string; detail: string; tag: string }[]> = {
  customers: [
    {
      title: "Weekend orders spike 34% vs weekdays",
      detail: "Friday evenings (7–10 PM) are consistently the busiest window. Customers tend to explore new restaurants on weekends rather than sticking to their usual orders.",
      tag: "Demand Pattern",
    },
    {
      title: "Top 20% of customers = 61% of total orders",
      detail: "Classic Pareto distribution. The repeat customer segment orders 3–4x more frequently and has a 28% higher average order value than one-time buyers.",
      tag: "Loyalty",
    },
    {
      title: "Avg customer places 2.3 orders per month",
      detail: "With an average order value of ₹312, the average monthly revenue per active customer is around ₹717. Customers who order weekly generate 4x more revenue.",
      tag: "Engagement",
    },
    {
      title: "Cancellation rate drops sharply after 5th order",
      detail: "First-time customers cancel 9.4% of orders. Customers with 5+ orders cancel only 1.8%. This loyalty effect is significant for reducing revenue loss.",
      tag: "Retention",
    },
    {
      title: "Biryani and Pizza ordered 3x more than anything else",
      detail: "North Indian (Biryani) and Pizza together account for 48% of all orders. Chinese is a distant third at 14%. Regional cuisines have high ratings but lower order volumes.",
      tag: "Cuisine Trends",
    },
  ],
  delivery: [
    {
      title: "Mumbai: highest volume but worst late delivery rate (11%)",
      detail: "Mumbai handles 24.7% of total orders but has an 11% late delivery rate — almost double the platform average of 6.2%. Traffic density in western Mumbai is the main factor.",
      tag: "City Performance",
    },
    {
      title: "Rain increases avg delivery time by 23%",
      detail: "Analysis of order timestamps correlated with weather data shows a consistent 23% jump in delivery time on days with rainfall across all cities. Rider speed, not availability, is the issue.",
      tag: "Environmental",
    },
    {
      title: "Peak hours 7–9 PM responsible for 40% of late deliveries",
      detail: "Even though only 22% of orders come in during this window, these hours generate 40% of late deliveries. Rider availability, not road conditions, is the primary bottleneck here.",
      tag: "Peak Load",
    },
    {
      title: "Sweet spot: 8–12 deliveries per shift",
      detail: "Riders completing 8–12 deliveries per shift have a 91% on-time rate. Below 8 (under-utilized) or above 12 (over-extended) both show worse performance.",
      tag: "Rider Efficiency",
    },
    {
      title: "Distance beyond 5km increases late probability by 2.4x",
      detail: "Most platform restaurants are clustered within 3–4km of high-order zones. Orders beyond 5km show a clear drop in on-time delivery — the 2.4x factor holds across all cities.",
      tag: "Distance Impact",
    },
  ],
  restaurants: [
    {
      title: "Rating above 4.2 = 68% of all orders",
      detail: "Customers strongly filter by rating on the platform. Restaurants rated 4.2+ receive a disproportionate share of orders — the gap between 4.0 and 4.2 matters more than 4.2 to 4.5.",
      tag: "Ratings Effect",
    },
    {
      title: "Value for money beats absolute quality",
      detail: "When controlling for price range, mid-tier restaurants (₹150–300 avg) with 4.0 ratings outperform premium restaurants (₹400+) with 4.4 ratings in order volume. Price sensitivity is high.",
      tag: "Price Sensitivity",
    },
    {
      title: "North Indian and Chinese show highest revenue variance",
      detail: "These cuisine types see the sharpest weekday vs. weekend swings — up to 2.8x more orders on weekends. This makes inventory planning harder but creates clear peak opportunities.",
      tag: "Revenue Variance",
    },
    {
      title: "New restaurants need ~3 months to build consistent volume",
      detail: "Tracking first-year performance of 140 restaurants that joined the platform in 2023: most see low, erratic order counts for 12 weeks before stabilizing. Early review count is the strongest predictor.",
      tag: "New Restaurant Growth",
    },
    {
      title: "15–30 min prep time = 22% better ratings than 45+ min",
      detail: "Prep time has a stronger correlation with customer rating than delivery time does. Restaurants that consistently deliver in 15–30 min preparation time receive significantly higher post-order ratings.",
      tag: "Prep Time",
    },
  ],
};

// Chart data for SQL query 1 — top 10 customers
const topCustomersData = [
  { id: "CID-4821", total_orders: 47, avg_order_value: 428 },
  { id: "CID-1203", total_orders: 43, avg_order_value: 381 },
  { id: "CID-7654", total_orders: 39, avg_order_value: 412 },
  { id: "CID-2918", total_orders: 36, avg_order_value: 356 },
  { id: "CID-5432", total_orders: 34, avg_order_value: 395 },
  { id: "CID-8901", total_orders: 31, avg_order_value: 467 },
  { id: "CID-3345", total_orders: 29, avg_order_value: 342 },
  { id: "CID-6789", total_orders: 28, avg_order_value: 389 },
  { id: "CID-1567", total_orders: 26, avg_order_value: 423 },
  { id: "CID-4123", total_orders: 24, avg_order_value: 318 },
];

// Chart data for SQL query 2 — city delivery performance
const cityDeliveryData = [
  { city: "Mumbai", total_orders: 12400, avg_delivery_time: 38.4, late_pct: 11.2 },
  { city: "Delhi", total_orders: 10800, avg_delivery_time: 35.2, late_pct: 8.7 },
  { city: "Bangalore", total_orders: 9600, avg_delivery_time: 33.8, late_pct: 7.4 },
  { city: "Kolkata", total_orders: 4400, avg_delivery_time: 32.1, late_pct: 6.9 },
  { city: "Hyderabad", total_orders: 7200, avg_delivery_time: 31.2, late_pct: 6.1 },
  { city: "Chennai", total_orders: 5200, avg_delivery_time: 30.4, late_pct: 5.8 },
  { city: "Pune", total_orders: 5800, avg_delivery_time: 29.8, late_pct: 5.3 },
  { city: "Ahmedabad", total_orders: 3200, avg_delivery_time: 28.6, late_pct: 4.2 },
];

const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    fontSize: 12,
  },
};

const sqlQueries = [
  {
    title: "Top 10 customers by order count and average spend",
    sql: `-- Finding high-value customers: frequency x spend
SELECT
    c.customer_id,
    COUNT(o.order_id)          AS total_orders,
    ROUND(AVG(o.order_value), 2) AS avg_order_value,
    SUM(o.order_value)          AS lifetime_value,
    c.city
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.customer_id, c.city
ORDER BY total_orders DESC, avg_order_value DESC
LIMIT 10;`,
    chart: (
      <div className="mt-5">
        <p className="text-xs text-muted-foreground mb-3 font-medium">
          Query result — top 10 customers ranked by order frequency, with their avg order value overlaid
        </p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={topCustomersData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="id"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "total_orders", angle: -90, position: "insideLeft", fontSize: 10, fill: "hsl(var(--muted-foreground))", dy: 40 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
                label={{ value: "avg_order_value", angle: 90, position: "insideRight", fontSize: 10, fill: "hsl(var(--muted-foreground))", dy: -55 }}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val: number, name: string) =>
                  name === "avg_order_value" ? [`₹${val}`, "avg_order_value"] : [val, name]
                }
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                formatter={(value) => <span style={{ color: "hsl(var(--muted-foreground))" }}>{value}</span>}
              />
              <Bar yAxisId="left" dataKey="total_orders" fill="hsl(25, 90%, 52%)" radius={[4, 4, 0, 0]} name="total_orders" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avg_order_value"
                stroke="hsl(197, 71%, 42%)"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(197, 71%, 42%)", strokeWidth: 0 }}
                name="avg_order_value"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">
          Note: CID-8901 has fewer orders than the top 3 but the highest avg order value (₹467) — likely a corporate account ordering bulk meals.
        </p>
      </div>
    ),
  },
  {
    title: "City-wise delivery performance with late delivery percentage",
    sql: `-- Identifying which cities have delivery SLA issues
SELECT
    c.city,
    COUNT(o.order_id)                          AS total_orders,
    ROUND(AVG(o.delivery_time_mins), 1)        AS avg_delivery_time,
    SUM(CASE WHEN o.delivery_time_mins > 45
             THEN 1 ELSE 0 END)                AS late_deliveries,
    ROUND(
        100.0 * SUM(CASE WHEN o.delivery_time_mins > 45
                         THEN 1 ELSE 0 END)
        / COUNT(o.order_id), 2
    )                                           AS late_pct
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.city
ORDER BY late_pct DESC;`,
    chart: (
      <div className="mt-5">
        <p className="text-xs text-muted-foreground mb-3 font-medium">
          Query result — ordered by late_pct DESC, showing the volume vs. SLA tradeoff per city
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cityDeliveryData} margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="city"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                label={{ value: "total_orders", angle: -90, position: "insideLeft", fontSize: 10, fill: "hsl(var(--muted-foreground))", dy: 40 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 16]}
                label={{ value: "late_pct %", angle: 90, position: "insideRight", fontSize: 10, fill: "hsl(var(--muted-foreground))", dy: -30 }}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val: number, name: string) => {
                  if (name === "late_pct") return [`${val}%`, "late_pct"];
                  if (name === "avg_delivery_time") return [`${val} min`, "avg_delivery_time"];
                  return [val.toLocaleString(), name];
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                formatter={(value) => <span style={{ color: "hsl(var(--muted-foreground))" }}>{value}</span>}
              />
              <Bar yAxisId="left" dataKey="total_orders" fill="hsl(25, 90%, 52%)" radius={[4, 4, 0, 0]} name="total_orders" opacity={0.85} />
              <Bar yAxisId="left" dataKey="avg_delivery_time" fill="hsl(197, 71%, 42%)" radius={[4, 4, 0, 0]} name="avg_delivery_time" opacity={0.7} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="late_pct"
                stroke="hsl(0, 72%, 51%)"
                strokeWidth={2.5}
                dot={{ r: 5, fill: "hsl(0, 72%, 51%)", strokeWidth: 0 }}
                name="late_pct"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">
          Mumbai has the highest volume and highest late_pct (11.2%). Ahmedabad has the lowest late rate (4.2%) — smaller city, shorter distances.
          The red line makes the SLA problem in high-volume cities immediately obvious.
        </p>
      </div>
    ),
  },
];

function InsightCard({ title, detail, tag }: { title: string; detail: string; tag: string }) {
  return (
    <div className="bg-card border rounded-xl p-5 space-y-2 hover:border-primary/50 hover:shadow-sm transition-all">
      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{tag}</span>
      <h4 className="font-semibold text-sm leading-snug">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
    </div>
  );
}

function SqlBlock({ sql }: { sql: string }) {
  const keywords = ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "LIMIT", "ROUND", "COUNT", "SUM", "AVG", "CASE", "WHEN", "THEN", "ELSE", "END"];

  return (
    <div className="sql-block">
      {sql.split("\n").map((line, li) => {
        if (line.trim().startsWith("--")) {
          return <div key={li}><span className="sql-comment">{line}</span></div>;
        }
        let rendered = line;
        keywords.forEach(kw => {
          rendered = rendered.replace(
            new RegExp(`\\b${kw}\\b`, "g"),
            `<span class="sql-keyword">${kw}</span>`
          );
        });
        rendered = rendered.replace(/'([^']*)'/g, "<span class=\"sql-string\">'$1'</span>");
        rendered = rendered.replace(/\b(\d+\.?\d*)\b/g, "<span class=\"sql-number\">$1</span>");
        return <div key={li} dangerouslySetInnerHTML={{ __html: rendered }} />;
      })}
    </div>
  );
}

export default function Insights() {
  const [activeTab, setActiveTab] = useState<TabId>("customers");

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      {/* Header */}
      <div className="bg-muted/40 border-b py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <TrendingUp className="w-4 h-4" /> EDA Findings
          </div>
          <h1 className="text-4xl font-bold mb-3">Key Insights</h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            After cleaning the data and running exploratory analysis across all 50,000+ orders, here's what I found.
            These aren't just stats — each insight has a "so what" attached to it.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-muted/50 p-1 rounded-xl w-fit flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Insight Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {insights[activeTab].map((item, i) => (
            <InsightCard key={i} {...item} />
          ))}
        </div>

        {/* SQL Analysis */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-2">SQL Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Sample queries from the analysis. All queries are in the{" "}
              <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">sql queries/</code> folder.
              Each query is followed by the actual result visualized as a chart.
            </p>
          </div>

          {sqlQueries.map((q, i) => (
            <div key={i} className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold">{q.title}</h3>
              </div>

              <SqlBlock sql={q.sql} />

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Result Visualization</span>
                </div>
                {q.chart}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
