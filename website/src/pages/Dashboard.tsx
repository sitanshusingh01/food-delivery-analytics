import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { LayoutDashboard } from "lucide-react";

const cityData = [
  { city: "Mumbai", orders: 12400 },
  { city: "Delhi", orders: 10800 },
  { city: "Bangalore", orders: 9600 },
  { city: "Hyderabad", orders: 7200 },
  { city: "Pune", orders: 5800 },
  { city: "Chennai", orders: 5200 },
  { city: "Kolkata", orders: 4400 },
  { city: "Ahmedabad", orders: 3200 },
];

const monthlyData = [
  { month: "Jan", orders: 3200 },
  { month: "Feb", orders: 3600 },
  { month: "Mar", orders: 4100 },
  { month: "Apr", orders: 4800 },
  { month: "May", orders: 5200 },
  { month: "Jun", orders: 6100 },
  { month: "Jul", orders: 5800 },
  { month: "Aug", orders: 6400 },
  { month: "Sep", orders: 5900 },
  { month: "Oct", orders: 6800 },
  { month: "Nov", orders: 7200 },
  { month: "Dec", orders: 8100 },
];

const restaurantData = [
  { name: "Biryani Blues", revenue: 182000 },
  { name: "Pizza Hut", revenue: 164000 },
  { name: "KFC", revenue: 158000 },
  { name: "Dominos", revenue: 145000 },
  { name: "Subway", revenue: 138000 },
  { name: "McDonald's", revenue: 125000 },
  { name: "Burger King", revenue: 118000 },
  { name: "Haldiram's", revenue: 112000 },
  { name: "Fasos", revenue: 98000 },
  { name: "Box8", revenue: 87000 },
];

const deliveryData = [
  { name: "Under 30 min", value: 42 },
  { name: "30–45 min", value: 35 },
  { name: "45–60 min", value: 16 },
  { name: "Over 60 min", value: 7 },
];

const PIE_COLORS = ["#f97316", "#22c55e", "#f59e0b", "#ef4444"];

const kpis = [
  { label: "Total Revenue", value: "₹48.2L", sub: "Jan–Dec 2023" },
  { label: "Avg Order Value", value: "₹312", sub: "across all cities" },
  { label: "Cancellation Rate", value: "4.2%", sub: "vs 5.8% industry avg" },
  { label: "Peak Hour", value: "8–9 PM", sub: "highest order volume" },
];

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      {/* Header */}
      <div className="bg-muted/40 border-b py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <LayoutDashboard className="w-4 h-4" /> Dashboard Preview
          </div>
          <h1 className="text-4xl font-bold mb-3">Operations Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            These are the key metrics from the Power BI analysis, recreated here as interactive charts.
            The full dashboard (with filters, drill-downs, and maps) is available in the .pbix file on GitHub.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <div key={kpi.label} className="bg-card border rounded-xl p-5 text-center shadow-sm">
              <div className="text-2xl font-bold text-primary mb-1">{kpi.value}</div>
              <div className="text-sm font-semibold text-foreground">{kpi.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart 1 — City Operations */}
        <section className="bg-card border rounded-2xl p-6 shadow-sm">
          <SectionHeader
            title="Dashboard 1 — City Operations"
            desc="Order volume distribution across the 8 cities analyzed. Mumbai and Delhi account for nearly 40% of all orders combined."
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="city"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(val: number) => [val.toLocaleString(), "Orders"]}
                />
                <Bar dataKey="orders" fill="hsl(25, 90%, 52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Chart 2 — Customer Insights */}
        <section className="bg-card border rounded-2xl p-6 shadow-sm">
          <SectionHeader
            title="Dashboard 2 — Customer Insights"
            desc="Monthly order trend for 2023. The ramp-up from January to December is clear — December alone had 8,100 orders, likely driven by festive season demand."
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(val: number) => [val.toLocaleString(), "Orders"]}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(25, 90%, 52%)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(25, 90%, 52%)", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Chart 3 — Restaurant Performance */}
        <section className="bg-card border rounded-2xl p-6 shadow-sm">
          <SectionHeader
            title="Dashboard 3 — Restaurant Performance"
            desc="Top 10 restaurants by total revenue for 2023. Biryani Blues leads by a significant margin — partly due to higher average order values."
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={restaurantData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={88}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(val: number) => [`₹${val.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="hsl(197, 71%, 42%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Chart 4 — Delivery SLA */}
        <section className="bg-card border rounded-2xl p-6 shadow-sm">
          <SectionHeader
            title="Dashboard 4 — Delivery SLA"
            desc="Breakdown of delivery times across all orders. 77% of orders are delivered within 45 minutes, but the 7% over 60 minutes is a clear area for improvement."
          />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-64 w-full md:w-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {deliveryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    formatter={(val: number, name: string) => [`${val}%`, name]}
                  />
                  <Legend
                    formatter={(value) => <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {deliveryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.value}%`, background: PIE_COLORS[i] }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-3 leading-relaxed">
                The 7% in the "Over 60 min" bucket is concentrated in Mumbai (traffic) and orders placed between 7–9 PM (peak load).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
