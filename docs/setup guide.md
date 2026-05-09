# Setup Guide

Step by step instructions for running the project locally.

## Requirements

- Python 3.11 or higher
- PostgreSQL 14+ (optional, only needed for SQL queries)
- Power BI Desktop (Windows only, for the .pbix dashboard)
- Jupyter Notebook

## Step 1 — Clone the Repo

```bash
git clone https://github.com/sitanshusingh01/food-delivery-analytics
cd food-delivery-analytics
```

## Step 2 — Python Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate       # Mac/Linux
venv\Scripts\activate          # Windows

# Install packages
pip install -r requirements.txt
```

## Step 3 — Get the Data

The raw dataset files are not committed to git (too large). Download them from Kaggle:

1. [Zomato Restaurant Dataset](https://www.kaggle.com) — search "zomato restaurants"
2. [Food Delivery Dataset](https://www.kaggle.com) — search "food delivery orders India"

Place the downloaded CSVs in `data/raw/`.

The cleaned versions (`data/cleaned/`) are already committed with a 5k-row sample.

## Step 4 — Run the Notebooks

```bash
jupyter notebook
```

Open and run in this order:
1. `notebooks/01 data cleaning.ipynb` — reads from `data/raw/`, writes to `data/cleaned/`
2. `notebooks/02 EDA customers.ipynb`
3. `notebooks/03 EDA delivery.ipynb`
4. `notebooks/04 EDA restaurants.ipynb`

## Step 5 — Database Setup (Optional)

If you want to run the SQL queries locally:

```bash
# Create a PostgreSQL database
createdb food_delivery

# Load cleaned data (example for orders table)
psql food_delivery -c "\COPY orders FROM 'data/cleaned/orders_cleaned.csv' WITH CSV HEADER;"
```

Then open any `.sql` file from `sql queries/` and run it against the `food_delivery` database.

## Step 6 — Power BI Dashboard

1. Open `dashboards/Food Delivery Dashboard.pbix` in Power BI Desktop
2. In Power Query, update the file path to point to your `data/cleaned/` folder
3. Click Refresh
			
Any issues? Email sitanshu2312res644@iitp.ac.in
