-- Monthly revenue trend for 2023
-- Wanted to see if there's a clear seasonal pattern

SELECT
    DATE_TRUNC('month', o.order_date)   AS month,
    COUNT(o.order_id)                   AS total_orders,
    ROUND(SUM(o.order_value), 0)        AS total_revenue,
    ROUND(AVG(o.order_value), 2)        AS avg_order_value,
    COUNT(DISTINCT o.customer_id)       AS active_customers
FROM orders o
WHERE o.status = 'Delivered'
  AND EXTRACT(YEAR FROM o.order_date) = 2023
GROUP BY DATE_TRUNC('month', o.order_date)
ORDER BY month;

-- Month over month growth rate
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(order_value)                AS revenue
    FROM orders
    WHERE status = 'Delivered'
      AND EXTRACT(YEAR FROM order_date) = 2023
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    ROUND(revenue, 0) AS revenue,
    ROUND(
        100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
        / LAG(revenue) OVER (ORDER BY month),
        1
    ) AS mom_growth_pct
FROM monthly
ORDER BY month;
