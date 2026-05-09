# Food Delivery Operations Analytics

A data analytics case study analyzing food delivery operations across 8 Indian cities.  
I built this project to understand how platforms like Swiggy and Zomato work under the hood —  
the customer behavior, delivery patterns, restaurant trends, and where things go wrong.

**By Sitanshu Singh** | IIT Patna | sitanshu2312res644@iitp.ac.in

## What This Project Is About

I started this as a simple SQL practice exercise and it kept growing. By the end I had:
- Cleaned and merged 50,000+ real order records
- Written 15+ SQL queries covering customer cohorts, revenue trends, and delivery SLA
- Built 4 Power BI dashboards
- Done EDA across customers, delivery partners, and restaurants
- Put up a website to document all the findings

It's not perfect. There are things I'd do differently now. But it's the most complete  
end-to-end analytics project I've built so far, and I learned a lot from it.

## The Dataset

Two Kaggle datasets merged together:
- **Zomato restaurant data** — restaurant metadata, ratings, cuisine types, prep times
- **Food delivery orders data** — 50,247 order records across 8 cities for 2023

Final tables:

| Table | Rows | Description |
|---|---|---|
| orders | 50,247 | Core transaction table |
| customers | 12,438 | Customer profiles and city |
| restaurants | 847 | Restaurant details and ratings |
| delivery_partners | 2,341 | Rider performance data |

Cities covered: Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad  
Date range: January 2023 to December 2023

## Folder Structure

```
Food Delivery Analytics/
│
├── data/
│   ├── raw/                    # Original downloaded CSVs (not committed - too large)
│   └── cleaned/
│       ├── orders_cleaned.csv
│       └── master_dataset.csv
│
├── sql queries/
│   ├── top customers.sql
│   ├── monthly revenue.sql
│   ├── delivery performance.sql
│   ├── city analysis.sql
│   └── restaurant rankings.sql
│
├── notebooks/
│   ├── 01 data cleaning.ipynb
│   ├── 02 EDA customers.ipynb
│   ├── 03 EDA delivery.ipynb
│   └── 04 EDA restaurants.ipynb
│
├── dashboards/
│   ├── Food Delivery Dashboard.pbix
│   └── screenshots/
│
├── website/                    # Portfolio site source
│
├── reports/
│   └── final report.pdf
│
├── docs/
│   └── setup guide.md
│
├── requirements.txt
├── .gitignore
└── README.md
```
## How to Run This Project

### 1. Clone the repo

```bash
git clone https://github.com/sitanshusingh01/food-delivery-analytics
cd food-delivery-analytics
```

### 2. Set up Python environment

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Open the notebooks

```bash
jupyter notebook
```

Run the notebooks in order — `01 data cleaning.ipynb` first, then `02`, `03`, `04`.

### 4. Set up the database (optional)

If you want to run the SQL queries:

```bash
# Create a local PostgreSQL database called food_delivery
# Then load the cleaned CSVs using the setup in docs/setup guide.md
```

### 5. Open Power BI dashboard

Open `dashboards/Food Delivery Dashboard.pbix` in Power BI Desktop.  
Connect it to your local database or the cleaned CSV files.

## Data Cleaning — What I Had to Fix

The raw data had a bunch of issues. Here's what I actually dealt with:

- **Missing delivery times** — 1,248 rows had null `delivery_time_mins`. Filled using the median for that city + restaurant combination.
- **City name inconsistencies** — "Bengaluru", "Bangalore, KA", "blr" were all the same city. Built a mapping dictionary to standardize them.
- **312 duplicate rows** — exact duplicates, kept first occurrence by order date.
- **Time format mess** — the `order_date` column had 6 different timestamp formats across the two source files. Standardized everything to ISO 8601.
- **47 outlier orders** — order values above ₹5,000 were flagged and stored separately. Didn't remove them but excluded from most analysis.
- **Ratings of 0.0** — these aren't actual ratings, they mean the customer didn't rate. Set to NaN.
- **23 rows with negative delivery times** — obvious data entry errors. Dropped.
- **89 orders with unknown restaurant IDs** — matched them to the restaurants table on name + city.

The full cleaning code is in `notebooks/01 data cleaning.ipynb`.

## EDA Key Findings

### Customer Behavior

- **Weekend orders are 34% higher than weekdays** — Friday 7–10 PM is the busiest window
- **Top 20% of customers drive 61% of total orders** — classic Pareto, but strong here
- **Average customer places 2.3 orders per month** at ₹312 average order value
- **Cancellation rate drops from 9.4% to 1.8%** after a customer's 5th order — loyalty matters
- **Biryani and Pizza = 48% of all orders** — North Indian and Pizza dominate

### Delivery Performance

- **Mumbai late delivery rate: 11.2%** — highest on the platform, nearly double the average
- **Rain adds 23% to average delivery time** across all cities
- **Peak hours 7–9 PM cause 40% of late deliveries** even though only 22% of orders come in then
- **Riders doing 8–12 deliveries per shift have 91% on-time rate** — that's the sweet spot
- **Orders beyond 5km are 2.4x more likely to be late**

### Restaurant Performance

- **Restaurants rated 4.2+ get 68% of all platform orders** — rating threshold matters more than I expected
- **Prep time correlates more with customer rating than delivery time does**
- **New restaurants take about 3 months to build consistent order volume**
- **Mid-tier restaurants (₹150–300) with 4.0 ratings outperform premium ones** in order volume

## SQL Analysis

All queries are in the `sql queries/` folder. A few highlights:

```sql
-- Which cities have the worst delivery SLA?
SELECT
    c.city,
    COUNT(o.order_id) AS total_orders,
    ROUND(AVG(o.delivery_time_mins), 1) AS avg_delivery_time,
    ROUND(
        100.0 * SUM(CASE WHEN o.delivery_time_mins > 45 THEN 1 ELSE 0 END)
        / COUNT(o.order_id), 2
    ) AS late_pct
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.city
ORDER BY late_pct DESC;
```

Result: Mumbai (11.2%), Delhi (8.7%), Bangalore (7.4%) are the worst three.  
Ahmedabad (4.2%) is the best — smaller city, shorter delivery distances.

## Power BI Dashboards

Four dashboards in the `.pbix` file:

**Dashboard 1 — City Operations**  
Order volumes by city, avg delivery time, late delivery heatmap

**Dashboard 2 — Customer Insights**  
Monthly order trends, customer segments, cancellation analysis

**Dashboard 3 — Restaurant Performance**  
Top restaurants by revenue, cuisine breakdown, rating vs. orders scatter

**Dashboard 4 — Delivery SLA**  
On-time vs. late breakdown, peak hour analysis, rider performance

Screenshots in `dashboards/screenshots/`.


## Tech Stack

| Area | Tools |
|---|---|
| Data Cleaning | Python 3.11, Pandas, NumPy |
| Analysis | Python, SQL (PostgreSQL) |
| Visualization | Matplotlib, Seaborn, Power BI |
| Web Portfolio | HTML, CSS, JavaScript |
| Version Control | Git, GitHub |
| Deployment | GitHub Pages (website), Power BI Service (dashboards) |

## What I Learned

A few things that actually surprised me during this project:

1. **Data cleaning takes way longer than analysis** — the 50k rows had problems I never would have anticipated from looking at a Kaggle description
2. **SQL window functions are really useful once you actually need them** — I finally understood RANK() and LAG() by writing the customer cohort queries
3. **Prep time correlates with ratings more than delivery time** — this was counterintuitive and I double-checked it several times
4. **Version control your data files** — I overwrote a cleaned dataset early on and lost two days of work
5. **Communicating the finding matters as much as finding it** — the dashboard forced me to simplify, which helped me understand the results better

## Future Work

Things I'd add if I had more time:
- Geospatial analysis with restaurant + customer location mapping
- Time series forecasting for order volume by city
- Customer lifetime value modeling
- RFM segmentation (Recency, Frequency, Monetary)

## About Me

**Sitanshu Singh**  
B.S. Computer Science and Data Analytics — IIT Patna (Class of 2027)  
CPI: 9.06/10

Data Analytics Research Intern at IIT Bhilai (Jan–Apr 2026)

Certifications: IBM Data Analytics | Deloitte Australia Data Analytics | Tata GenAI Powered Data Analytics

Achievements: McKinsey Solve Assessment | Media & PR Coordinator, TEDx IIT Patna | NSS Coordinator

- GitHub: [github.com/sitanshusingh01](https://github.com/sitanshusingh01)
- LinkedIn: [linkedin.com/in/sitanshusingh](https://linkedin.com/in/sitanshusingh)
- Email: sitanshu2312res644@iitp.ac.in
- Phone: +91 8115926935

*This is a self-initiated learning project built over roughly 3 months. Feedback welcome.*
