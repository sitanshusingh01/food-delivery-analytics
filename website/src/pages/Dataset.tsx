import { Database, CheckCircle2, AlertCircle } from "lucide-react";

const stats = [
  { label: "Order Records", value: "50,247" },
  { label: "Unique Customers", value: "12,438" },
  { label: "Restaurant Records", value: "847" },
  { label: "Delivery Partners", value: "2,341" },
  { label: "Cities Covered", value: "8" },
  { label: "Date Range", value: "Jan–Dec 2023" },
];

const tables = [
  {
    name: "orders",
    rowCount: "50,247",
    columns: ["order_id", "customer_id", "restaurant_id", "rider_id", "order_date", "delivery_time_mins", "order_value", "payment_method", "status", "rating"],
  },
  {
    name: "customers",
    rowCount: "12,438",
    columns: ["customer_id", "city", "signup_date", "total_orders", "avg_order_value"],
  },
  {
    name: "restaurants",
    rowCount: "847",
    columns: ["restaurant_id", "name", "city", "cuisine_type", "avg_rating", "avg_prep_time", "price_range"],
  },
  {
    name: "delivery_partners",
    rowCount: "2,341",
    columns: ["rider_id", "city", "total_deliveries", "avg_delivery_time", "on_time_rate"],
  },
];

const cleaningSteps = [
  { issue: "Missing values in delivery_time_mins", fix: "Filled using city + restaurant median delivery time (1,248 rows affected)", type: "null" },
  { issue: "City name inconsistencies", fix: "Mapped 14 variants (e.g. 'Bengaluru', 'Bangalore, KA', 'blr') → 'Bangalore' using a custom dictionary", type: "format" },
  { issue: "Duplicate order records", fix: "Removed 312 exact duplicate rows; kept first occurrence by order_date", type: "duplicate" },
  { issue: "Incorrect time format in order_date", fix: "Standardized all timestamps to ISO 8601 format (YYYY-MM-DD HH:MM:SS)", type: "format" },
  { issue: "Order value outliers (> ₹5,000)", fix: "Identified 47 outlier orders — flagged but not removed, stored separately in outliers.csv", type: "outlier" },
  { issue: "Rating column had 0.0 values", fix: "Ratings of 0.0 treated as missing data (not actual ratings) — set to NaN and excluded from rating analyses", type: "null" },
  { issue: "Negative delivery times (data entry errors)", fix: "23 rows with delivery_time_mins < 0 were dropped from the dataset", type: "error" },
  { issue: "restaurant_id not matching in orders", fix: "89 orders referenced restaurant IDs not in the restaurants table — joined on best-match name+city", type: "consistency" },
];

const typeColors: Record<string, string> = {
  null: "bg-blue-500/10 text-blue-600",
  format: "bg-yellow-500/10 text-yellow-600",
  duplicate: "bg-purple-500/10 text-purple-600",
  outlier: "bg-orange-500/10 text-orange-600",
  error: "bg-red-500/10 text-red-600",
  consistency: "bg-green-500/10 text-green-600",
};

const paymentDist = [
  { method: "UPI (GPay, PhonePe)", pct: 58 },
  { method: "Cash on Delivery", pct: 22 },
  { method: "Credit / Debit Card", pct: 15 },
  { method: "Wallet (Paytm, etc.)", pct: 5 },
];

export default function Dataset() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      {/* Header */}
      <div className="bg-muted/40 border-b py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <Database className="w-4 h-4" /> About the Data
          </div>
          <h1 className="text-4xl font-bold mb-3">The Dataset</h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            Data sourced from two Kaggle datasets — a Zomato restaurant database and a food delivery orders dataset — 
            merged and cleaned into a single analytics-ready database. 
            The raw files are available in the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">data/raw/</code> folder on GitHub.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Source Info */}
        <section>
          <h2 className="text-2xl font-bold mb-5">Data Sources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Zomato Restaurant Dataset</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Restaurant metadata: name, city, cuisine type, ratings, price range, prep time. 
                    ~1,200 restaurants originally — filtered to 847 with sufficient order data.
                  </p>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">View on Kaggle →</a>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Food Delivery Orders Dataset</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Order-level data: timestamps, delivery times, customer IDs, rider IDs, order values, 
                    payment methods, ratings, and status. 50k+ records for 2023.
                  </p>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">View on Kaggle →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-5">Tables Overview</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tables.map(t => (
              <div key={t.name} className="bg-card border rounded-xl overflow-hidden">
                <div className="bg-secondary px-4 py-2.5 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-secondary-foreground">{t.name}</span>
                  <span className="text-xs text-secondary-foreground/70">{t.rowCount} rows</span>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {t.columns.map(col => (
                      <span key={col} className="px-2 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Cleaning */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Data Cleaning Notes</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This is what the raw data looked like before it was usable. The full cleaning code is in <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">notebooks/01 data cleaning.ipynb</code>.
          </p>
          <div className="space-y-3">
            {cleaningSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-card border rounded-xl">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-medium">{step.issue}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${typeColors[step.type]}`}>
                      {step.type}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Method Distribution */}
        <section>
          <h2 className="text-2xl font-bold mb-5">Payment Method Distribution</h2>
          <div className="bg-card border rounded-xl p-6 space-y-4">
            {paymentDist.map(p => (
              <div key={p.method}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium">{p.method}</span>
                  <span className="text-sm text-muted-foreground">{p.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-2">
              UPI dominates at 58% — consistent with national trends in India. Cash on Delivery remains surprisingly high at 22%, mostly in Tier-2 cities.
            </p>
          </div>
        </section>

        {/* Download */}
        <section className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-bold mb-2">Download Sample Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            A 5,000-row sample of the cleaned dataset is available for download. The full dataset is on GitHub.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Database className="w-4 h-4" /> Download Sample CSV
          </a>
        </section>
      </div>
    </div>
  );
}
