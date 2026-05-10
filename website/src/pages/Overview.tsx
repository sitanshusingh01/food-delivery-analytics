import { FileText, Target, Table2, FolderTree } from "lucide-react";

const objectives = [
  "Understand which cities generate the most orders and why delivery times differ across them",
  "Identify top customer segments — who are the repeat buyers and what do they order",
  "Analyze restaurant performance: ratings, revenue, cuisine popularity, and order consistency",
  "Find the root causes of late deliveries — is it rider availability, distance, or time of day?",
  "Study cancellation patterns and figure out what drives them",
  "Build a Power BI dashboard that could actually be used by an ops team",
];

const tables = [
  {
    name: "orders",
    columns: [
      { col: "order_id", type: "INT", desc: "Primary key" },
      { col: "customer_id", type: "INT", desc: "FK to customers table" },
      { col: "restaurant_id", type: "INT", desc: "FK to restaurants table" },
      { col: "rider_id", type: "INT", desc: "FK to delivery_partners" },
      { col: "order_date", type: "DATETIME", desc: "When the order was placed" },
      { col: "delivery_time_mins", type: "INT", desc: "Total delivery time in minutes" },
      { col: "order_value", type: "FLOAT", desc: "Order total in INR" },
      { col: "payment_method", type: "VARCHAR", desc: "UPI, Card, Cash on Delivery" },
      { col: "status", type: "VARCHAR", desc: "Delivered, Cancelled, Pending" },
      { col: "rating", type: "FLOAT", desc: "Customer rating (1–5)" },
    ],
  },
  {
    name: "customers",
    columns: [
      { col: "customer_id", type: "INT", desc: "Primary key" },
      { col: "city", type: "VARCHAR", desc: "Customer's city" },
      { col: "signup_date", type: "DATE", desc: "When account was created" },
      { col: "total_orders", type: "INT", desc: "Lifetime order count" },
      { col: "avg_order_value", type: "FLOAT", desc: "Average spend per order" },
    ],
  },
  {
    name: "restaurants",
    columns: [
      { col: "restaurant_id", type: "INT", desc: "Primary key" },
      { col: "name", type: "VARCHAR", desc: "Restaurant name" },
      { col: "city", type: "VARCHAR", desc: "Operating city" },
      { col: "cuisine_type", type: "VARCHAR", desc: "Indian, Chinese, Pizza, etc." },
      { col: "avg_rating", type: "FLOAT", desc: "Platform rating" },
      { col: "avg_prep_time", type: "INT", desc: "Average food prep time in mins" },
    ],
  },
  {
    name: "delivery_partners",
    columns: [
      { col: "rider_id", type: "INT", desc: "Primary key" },
      { col: "city", type: "VARCHAR", desc: "Rider's operating city" },
      { col: "total_deliveries", type: "INT", desc: "Lifetime delivery count" },
      { col: "avg_delivery_time", type: "FLOAT", desc: "Rider's average delivery time" },
      { col: "on_time_rate", type: "FLOAT", desc: "Percentage of on-time deliveries" },
    ],
  },
];

const folderTree = [
  { indent: 0, name: "Food Delivery Analytics/", isDir: true },
  { indent: 1, name: "data/", isDir: true },
  { indent: 2, name: "raw/", isDir: true },
  { indent: 3, name: "orders_raw.csv", isDir: false },
  { indent: 3, name: "restaurants_raw.csv", isDir: false },
  { indent: 3, name: "customers_raw.csv", isDir: false },
  { indent: 2, name: "cleaned/", isDir: true },
  { indent: 3, name: "orders_cleaned.csv", isDir: false },
  { indent: 3, name: "master_dataset.csv", isDir: false },
  { indent: 1, name: "sql queries/", isDir: true },
  { indent: 2, name: "top customers.sql", isDir: false },
  { indent: 2, name: "monthly revenue.sql", isDir: false },
  { indent: 2, name: "delivery performance.sql", isDir: false },
  { indent: 2, name: "city analysis.sql", isDir: false },
  { indent: 2, name: "restaurant rankings.sql", isDir: false },
  { indent: 1, name: "notebooks/", isDir: true },
  { indent: 2, name: "01 data cleaning.ipynb", isDir: false },
  { indent: 2, name: "02 EDA customers.ipynb", isDir: false },
  { indent: 2, name: "03 EDA delivery.ipynb", isDir: false },
  { indent: 2, name: "04 EDA restaurants.ipynb", isDir: false },
  { indent: 1, name: "dashboards/", isDir: true },
  { indent: 2, name: "Food Delivery Dashboard.pbix", isDir: false },
  { indent: 2, name: "screenshots/", isDir: true },
  { indent: 1, name: "website/", isDir: true },
  { indent: 1, name: "reports/", isDir: true },
  { indent: 2, name: "final report.pdf", isDir: false },
  { indent: 1, name: "docs/", isDir: true },
  { indent: 2, name: "setup guide.md", isDir: false },
  { indent: 1, name: "requirements.txt", isDir: false },
  { indent: 1, name: "README.md", isDir: false },
];

export default function Overview() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      {/* Header */}
      <div className="bg-muted/40 border-b py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <FileText className="w-4 h-4" /> Project Overview
          </div>
          <h1 className="text-4xl font-bold mb-4">Understanding the Project</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            I started this project because I wanted to understand what goes on "behind the scenes" of food delivery apps.
            There's a lot of interesting data hiding in order records — delivery times, cancellations, peak hours, city patterns.
            This page covers the problem, what I was trying to answer, and how everything is structured.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-16">
        {/* Business Problem */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Business Problem</h2>
          </div>
          <div className="bg-card border rounded-xl p-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Food delivery platforms handle thousands of orders every day across multiple cities. 
              But just processing orders isn't enough — to stay competitive and profitable, 
              they need to understand <span className="text-foreground font-medium">where things are going wrong</span> and 
              where there's room to improve.
            </p>
            <p>
              Late deliveries hurt customer satisfaction. High cancellation rates signal either restaurant issues 
              or poor UX. Some cities are growing fast while others are stagnating. 
              Certain restaurants drive outsized revenue — but nobody's paying attention to <em>why</em>.
            </p>
            <p>
              The goal of this project is to <span className="text-foreground font-medium">turn raw transactional data into 
              actionable operational insights</span> — the kind that an ops analyst or product manager 
              could actually use to make decisions.
            </p>
          </div>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-2xl font-bold mb-5">Project Objectives</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dataset Schema */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Table2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Dataset Schema</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            The dataset was assembled from two Kaggle sources — a Zomato restaurant dataset and a food delivery orders dataset.
            After merging and cleaning, the final database has 4 main tables:
          </p>
          <div className="space-y-6">
            {tables.map(table => (
              <div key={table.name} className="border rounded-xl overflow-hidden">
                <div className="bg-secondary px-4 py-2.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-mono font-semibold text-secondary-foreground">{table.name}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/60 text-left">
                        <th className="px-4 py-2 font-semibold text-muted-foreground w-40">Column</th>
                        <th className="px-4 py-2 font-semibold text-muted-foreground w-28">Type</th>
                        <th className="px-4 py-2 font-semibold text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((col, i) => (
                        <tr key={col.col} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                          <td className="px-4 py-2 font-mono text-primary font-medium">{col.col}</td>
                          <td className="px-4 py-2 font-mono text-muted-foreground">{col.type}</td>
                          <td className="px-4 py-2 text-muted-foreground">{col.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Folder Structure */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <FolderTree className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Project Structure</h2>
          </div>
          <div className="sql-block">
            {folderTree.map((item, i) => (
              <div key={i} style={{ paddingLeft: `${item.indent * 20}px` }} className="leading-7">
                <span className={item.isDir ? "text-[hsl(25,90%,62%)] font-semibold" : "sql-string"}>
                  {item.indent > 0 && <span className="text-[hsl(220,12%,40%)]">{"├── "}</span>}
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-card border rounded-xl">
            <h3 className="text-sm font-bold mb-3">Requirements (requirements.txt)</h3>
            <div className="sql-block text-xs">
              <span className="sql-comment"># Core data processing</span>{"\n"}
              <span className="sql-string">pandas</span>==2.1.0{"\n"}
              <span className="sql-string">numpy</span>==1.26.0{"\n"}
              <span className="sql-string">matplotlib</span>==3.8.0{"\n"}
              <span className="sql-string">seaborn</span>==0.13.0{"\n"}
              <span className="sql-string">openpyxl</span>==3.1.2{"\n"}
              {"\n"}
              <span className="sql-comment"># Database connection</span>{"\n"}
              <span className="sql-string">sqlalchemy</span>==2.0.0{"\n"}
              <span className="sql-string">psycopg2-binary</span>==2.9.9{"\n"}
              {"\n"}
              <span className="sql-comment"># Jupyter environment</span>{"\n"}
              <span className="sql-string">jupyter</span>==1.0.0{"\n"}
              <span className="sql-string">ipykernel</span>==6.25.0
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
