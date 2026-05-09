-- Top 10 customers by order frequency and average spend
-- I used this to identify the high-value segment for the customer insights dashboard

SELECT
    c.customer_id,
    COUNT(o.order_id)            AS total_orders,
    ROUND(AVG(o.order_value), 2) AS avg_order_value,
    SUM(o.order_value)           AS lifetime_value,
    c.city
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.customer_id, c.city
ORDER BY total_orders DESC, avg_order_value DESC
LIMIT 10;

-- Follow-up: what percentage of total revenue do these 10 customers represent?
WITH top_customers AS (
    SELECT
        c.customer_id,
        SUM(o.order_value) AS ltv
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE o.status = 'Delivered'
    GROUP BY c.customer_id
    ORDER BY ltv DESC
    LIMIT 10
)
SELECT
    ROUND(SUM(ltv), 0)                                         AS top10_revenue,
    ROUND(100.0 * SUM(ltv) / (SELECT SUM(order_value)
                               FROM orders
                               WHERE status = 'Delivered'), 2) AS pct_of_total
FROM top_customers;
