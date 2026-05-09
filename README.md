# Food Delivery Operations Analytics

🌐 Live Website:  
https://sitanshusingh01.github.io/food-delivery-analytics/

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

```text
Food Delivery Analytics/
```

## Tech Stack

Python, SQL, PostgreSQL, Power BI, Pandas, NumPy, GitHub Pages

## About Me

**Sitanshu Singh**  
B.S. Computer Science and Data Analytics — IIT Patna (Class of 2027)
