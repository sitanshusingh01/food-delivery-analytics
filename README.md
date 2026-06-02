# Food Delivery Operations Analytics



I started this project wanting to understand what actually happens behind the scenes when you order food online. Not the user experience side — the operational side. Delivery times, cancellations, peak load, city differences, restaurant performance. The kind of stuff that an ops analyst at Swiggy or Zomato would actually care about.

What started as a SQL practice exercise turned into a full case study: 50,000+ real order records, four Power BI dashboards, EDA across three domains (customers, delivery, restaurants), and a portfolio website documenting the findings. It took longer than I expected — especially the data cleaning part — but it's the most complete end-to-end analytics project I've done so far.

**Sitanshu Singh** — B.S. CS & Data Analytics,IIT Patna   
sitanshu2312res644@iitp.ac.in | [LinkedIn](https://linkedin.com/in/sitanshusingh) | [GitHub](https://github.com/sitanshusingh01)


## Why I Built This

There's a weird gap in most "data analytics portfolios" — they show you cleaned data, a few charts, and a conclusion. What they skip is everything that happened before: the messy raw files, the judgment calls you have to make when data is missing or inconsistent, the dead ends in analysis.

I wanted to build something that showed that entire process. Not just "here's a dashboard" but: here's the raw dataset I started with, here's what was broken and why, here are the SQL queries I wrote and the questions they were trying to answer, here are the actual findings with a real "so what" attached to them.

The food delivery domain is also genuinely interesting from an operations standpoint. There are real constraints — rider availability, traffic, peak hours, restaurant prep times — and they interact in non-obvious ways. When Mumbai has an 11% late delivery rate and Ahmedabad has a 4.2% rate, that's not random. There's a story there.


## What the Project Covers

The analysis is split across three domains:

**Customer analytics** — who's ordering, how often, what they order, when they cancel, and how behavior changes as customers become more loyal. The finding that cancellation rates drop from 9.4% to 1.8% after a customer's 5th order wasn't something I expected going in.

**Delivery performance** — where deliveries are late, why, and what factors predict it. Peak hour load is the biggest driver of late deliveries, not road conditions. Rain adds 23% to average delivery time. Orders beyond 5km are 2.4x more likely to miss SLA.

**Restaurant performance** — rating thresholds, revenue concentration, how prep time affects customer ratings, and how long it takes a new restaurant to build consistent volume.

The portfolio website at the link above walks through all of this interactively — tabbed EDA findings, SQL queries with their result charts, a full operations dashboard with four Recharts visualizations, and dataset documentation with the cleaning notes.


## Tech Stack

### Data Analysis

| Tool | Version | What I Used It For |
|---|---|---|
| Python | 3.11 | Primary language for data cleaning and EDA |
| Pandas | 2.1.0 | Data loading, cleaning, transformation, merging |
| NumPy | 1.26.0 | Numerical operations, outlier detection |
| Matplotlib | 3.8.0 | Exploratory plots during analysis |
| Seaborn | 0.13.0 | Correlation heatmaps, distribution plots |
| SQLAlchemy | 2.0.0 | Python-to-PostgreSQL connection |
| psycopg2 | 2.9.9 | PostgreSQL driver |
| Jupyter | 1.0.0 | Notebooks for step by step analysis |

### Database and SQL

| Tool | What I Used It For |
|---|---|
| PostgreSQL | Local database to run SQL queries against the cleaned dataset |
| pgAdmin 4 | GUI for running queries and inspecting results |

### Dashboards

| Tool | What I Used It For |
|---|---|
| Power BI Desktop | Four operations dashboards with filters, drill-downs, and city maps |
| Power BI Service | Publishing and sharing the dashboards online |

### Portfolio Website

The website is built with **TypeScript** throughout — every component, page, and utility is `.tsx` or `.ts`. This was intentional: I wanted the codebase to be typed, especially since the chart data structures get complex on the Insights page.

| Tool       | Version | What I Used It For                                                             |
| ---------- | ------- | ------------------------------------------------------------------------------ |
| HTML5      | Latest  | Structured all webpages and application layouts                                |
| CSS3       | Latest  | Custom styling, responsive design, animations, and UI improvements             |
| JavaScript | ES6+    | Added interactivity, dynamic functionality, DOM manipulation, and API handling |
| TypeScript | 5.5     | Used for better type safety, cleaner code structure, and scalable development  |


### Infrastructure

| Tool | What I Used It For |
|---|---|
| Git + GitHub | Version control and code hosting |
| GitHub Pages | Hosting the portfolio website (main branch, root path) |


## Folder Structure

```
food-delivery-analytics/
│
├── data/
│   ├── raw/                         # Original Kaggle downloads (not committed — files too large)
│   └── cleaned/
│       ├── orders_cleaned.csv       # 50,247 rows after cleaning
│       └── master_dataset.csv       # All four tables merged for analysis
│
├── sql queries/
│   ├── top customers.sql            # High-value customer identification
│   ├── monthly revenue.sql          # Revenue trends and seasonality
│   ├── delivery performance.sql     # SLA analysis by city and time
│   ├── city analysis.sql            # City-level order and delivery metrics
│   └── restaurant rankings.sql      # Top restaurants by revenue and ratings
│
├── notebooks/
│   ├── 01 data cleaning.ipynb       # Raw → cleaned data pipeline
│   ├── 02 EDA customers.ipynb       # Customer behavior analysis
│   ├── 03 EDA delivery.ipynb        # Delivery performance deep-dive
│   └── 04 EDA restaurants.ipynb     # Restaurant performance analysis
│
├── dashboards/
│   ├── Food Delivery Dashboard.pbix # Power BI file (4 dashboards)
│   └── screenshots/                 # Dashboard screenshots
│
├── website/                         # Portfolio site source code (TypeScript + React)
│  
│
├── assets/                          # Built website CSS and JS (served by GitHub Pages)
├── index.html                       # Built website entry (served by GitHub Pages)
├── favicon.svg
├── .nojekyll                        # Tells GitHub Pages not to run Jekyll
│
├── reports/
│   └── final report.pdf             # Written summary of findings
│
├── docs/
│   └── setup guide.md               # DB setup, loading CSVs, running queries
│
├── requirements.txt                 # Python dependencies
├── .gitignore
└── README.md
```


## Getting Started

### Clone the repo

```bash
git clone https://github.com/sitanshusingh01/food-delivery-analytics
cd food-delivery-analytics
```

### Python environment setup

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Run the notebooks

```bash
jupyter notebook
```

Run them in order — `01 data cleaning.ipynb` first, since the later notebooks depend on the cleaned data it produces. The notebooks have markdown explanations at each step.

### Database setup (if you want to run the SQL queries locally)

The `docs/setup guide.md` has step-by-step instructions for creating a local PostgreSQL database and loading the cleaned CSVs into it. Short version:

```bash
# Create a database called food_delivery in psql
CREATE DATABASE food_delivery;

# Then run the setup script (loads the four tables from cleaned CSVs)
# See docs/setup guide.md for the full import commands
```

After that, the queries in `sql queries/` will run directly against your local DB.

### Open the Power BI dashboard

Open `dashboards/Food Delivery Dashboard.pbix` in Power BI Desktop. It's set up to connect to a local PostgreSQL database — update the connection string to point to your local `food_delivery` database, or swap it to point at the cleaned CSV files directly.

### Run the website locally

The compiled website is already at the repo root and served via GitHub Pages. If you want to run the source code locally and make changes:

```bash
cd website
npm install
npm run dev
```

This starts a dev server at `http://localhost:5173/food-delivery-analytics/`. The Vite config sets the base path to `/food-delivery-analytics/` to match GitHub Pages.

To rebuild and redeploy:

```bash
npm run build
# Copy everything from website/dist/ to the repo root, commit, and push
```


## Deployment (GitHub Pages)

The live site is served from the **main branch root**. No separate `gh-pages` branch, no GitHub Actions — just built files sitting at the repo root.

Here's how it works and how to update it:

1. Make changes in `website/src/`
2. Run `cd website && npm run build`
3. Copy the contents of `website/dist/` to the repo root (replacing `index.html`, `assets/`, `favicon.svg`, `robots.txt`)
4. Commit and push to `main`
5. GitHub Pages picks up the changes automatically within a minute or two

The `.nojekyll` file at the root tells GitHub Pages not to run its Jekyll processor — which matters here because the built assets have paths with underscores (`_` prefix) that Jekyll would otherwise ignore.

GitHub Pages configuration: **Source → main branch, / (root)**


## Data Cleaning — What the Raw Data Actually Looked Like

The Kaggle datasets weren't unusable, but they needed work. Some of this took longer than I expected.

**Missing delivery times** — 1,248 rows had a null `delivery_time_mins`. I filled these using the median delivery time for the same city and restaurant combination (not just city-wide median, because restaurant location within a city matters). Rows where I couldn't match on both criteria were dropped.

**City name inconsistencies** — This one was annoying. "Bengaluru", "Bangalore, KA", "BLR", "blr", "B'lore" were all the same city in the dataset. I ended up building a normalization dictionary with 14 variants mapped to 8 canonical city names.

**Duplicate rows** — 312 exact duplicates. Kept the first occurrence by `order_date`, removed the rest.

**Timestamp format chaos** — The `order_date` column had six different timestamp formats across the two source files. Some had timezones, some didn't. Standardized everything to `YYYY-MM-DD HH:MM:SS` (no timezone, assumed IST).

**Order value outliers** — 47 orders with values above ₹5,000. These are real orders (probably corporate catering), not errors, so I flagged them and stored them in a separate `outliers.csv` rather than dropping them. They're excluded from most analysis but I used them in the revenue totals.

**Ratings of 0.0** — Not actual ratings. Means the customer didn't rate the order. Set to NaN and excluded from any rating-based analysis.

**Negative delivery times** — 23 rows. Obviously wrong data. Dropped.

**Restaurant ID mismatches** — 89 orders referenced restaurant IDs that didn't exist in the restaurants table. I matched them using a fuzzy join on restaurant name + city. Got 71 of 89 matched; the remaining 18 were dropped.

All the cleaning code is in `notebooks/01 data cleaning.ipynb` with comments explaining each decision.


## Key Findings

### Customer Behavior

- Weekend orders run 34% higher than weekdays. Friday 7–10 PM is consistently the peak window.
- The top 20% of customers account for 61% of total orders — strong Pareto effect. These repeat buyers also have a 28% higher average order value than one-time customers.
- Average customer: 2.3 orders per month at ₹312 average order value. Weekly customers generate roughly 4x the revenue of monthly customers.
- Cancellation rate is 9.4% for first-time customers and drops to 1.8% for customers with 5+ orders. That's a big drop, and it has real revenue implications.
- Biryani and Pizza together account for 48% of all orders. Chinese is a distant third at 14%.

### Delivery Performance

- Mumbai processes 24.7% of total platform orders but has an 11.2% late delivery rate — nearly double the platform average of 6.2%.
- Rainfall increases average delivery time by 23% across all cities. This is rider speed, not rider availability.
- Peak hours (7–9 PM) generate 40% of late deliveries despite only 22% of order volume falling in that window. The bottleneck is rider availability, not road congestion.
- Rider sweet spot: 8–12 deliveries per shift gives a 91% on-time rate. Below 8 or above 12, performance drops.
- Beyond 5km, late delivery probability increases by 2.4x. Most high-order zones have restaurants within 3–4km, so this mostly affects edge cases.

### Restaurant Performance

- Restaurants rated 4.2+ receive 68% of all platform orders. The gap between 4.0 and 4.2 is more impactful than the gap between 4.2 and 4.5.
- Prep time correlates more strongly with customer rating than delivery time does. I checked this three times because it seemed counterintuitive.
- Mid-tier restaurants (₹150–300 avg order) with a 4.0 rating consistently outperform premium restaurants (₹400+) with 4.4 ratings in order volume. Price sensitivity is high.
- New restaurants need about 12 weeks to build consistent order volume. Early review count is the strongest predictor of whether they'll make it past that stage.


## Challenges

**The data cleaning took longer than the analysis.** I budgeted maybe 20% of my time for cleaning and used closer to 40%. The city name normalization alone took a couple of days because I kept finding new variants I hadn't mapped.

**Matching the dashboard visuals to Power BI.** The website charts are built with Recharts (TypeScript + React) to approximate what the Power BI dashboards show, but Power BI's composite charts with multiple axes don't translate perfectly to Recharts. I had to make some simplification decisions about which visuals were worth rebuilding exactly vs. which ones were close enough.

**TypeScript type safety with Recharts.** The `ComposedChart` on the Insights page has dual Y-axes and mixed bar/line series. Getting the types right — especially the tooltip formatter function signatures — required reading the Recharts source type definitions rather than relying on the docs, which are a bit incomplete for edge cases.

**GitHub Pages base path routing.** When you have a React SPA deployed on GitHub Pages at a sub-path like `/food-delivery-analytics/`, you have to set the Vite `base` config correctly, handle the router base path, and make sure all static asset references use the right prefix. It took a few attempts to get this working without 404s on page refresh.

**SQL window functions.** Writing the customer cohort analysis queries required understanding RANK() and LAG() properly. The Kaggle tutorials I'd done before didn't really prepare me for using them in practice on a dataset with this structure. I had to work through a few wrong approaches before the query made sense.


## Future Improvements

A few things I'd add with more time:

**Geospatial analysis** — I have city-level data but not lat/long for individual orders. If I could get location data, restaurant-to-customer distance maps would be genuinely useful for the delivery SLA analysis. Folium or GeoPandas would work for this.

**Time series forecasting** — The monthly order trend shows a clear growth pattern with seasonal peaks. Fitting even a basic ARIMA model to predict next-month order volumes by city would be a natural extension.

**RFM segmentation** — The customer loyalty finding (top 20% = 61% of orders) is a starting point for proper RFM (Recency, Frequency, Monetary) segmentation. A proper clustering approach would give more actionable customer segments than the percentile bins I used.

**Customer lifetime value modeling** — Given the cancellation drop-off pattern after the 5th order, there's a clear case for CLV modeling here. Even a simple cohort-based CLV estimate would add something to the business case section.

**Automated data pipeline** — Right now the cleaning is a one-time notebook run. A proper pipeline using something like Prefect or even just scheduled Python scripts would make the project reproducible on new data.


## What I Learned

A few things I actually took away from this:

The data cleaning phase is where you develop intuition about a dataset. By the time I finished cleaning, I understood the structure of the data — its quirks, its biases, what the edge cases looked like — in a way that made the analysis faster. Jumping straight to analysis on messy data would have produced bad results.

Window functions are one of those things where you don't really understand them until you have a real question that needs them. Writing the customer cohort queries — tracking how behavior changes across a customer's order history — made `LAG()` and `PARTITION BY` click in a way that tutorials hadn't.

TypeScript adds real value on a project like this. The website has chart data structures that get passed through multiple components and formatter functions. Having typed interfaces caught a couple of bugs early that would have been annoying to debug at runtime.

Prep time affecting customer ratings more than delivery time was the finding that surprised me most. My assumption going in was that late deliveries would dominate customer satisfaction. The data said otherwise — which is a useful reminder that assumptions about behavior don't always hold.

Documenting findings for a general audience is genuinely hard. The Power BI dashboards forced me to simplify, which helped me understand what was actually important vs. what was just interesting noise.


## About Me

**Sitanshu Singh**  
B.S. Computer Science and Data Analytics — IIT Patna (Class of 2027)  
CPI: 9.06/10

Data Analytics Research Intern at IIT Bhilai (Jan–Apr 2026) — worked on structured data analysis and visualization pipelines.

**Certifications:** IBM Data Analytics Professional Certificate · Deloitte Australia Data Analytics Job Simulation · Tata GenAI Powered Data Analytics  

If you have feedback on this project, or just want to talk about the analysis — feel free to reach out.

- **Email:** sitanshu2312res644@iitp.ac.in
- **Phone:** +91 8115926935
- **LinkedIn:** [linkedin.com/in/sitanshusingh](https://linkedin.com/in/sitanshusingh)
- **GitHub:** [github.com/sitanshusingh01](https://github.com/sitanshusingh01)
