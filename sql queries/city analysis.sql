-- City-level performance overview
-- Combines order volume, revenue, avg delivery, and cancellation rate

SELECT
    c.city,
    COUNT(o.order_id)                                       AS total_orders,
    ROUND(SUM(o.order_value), 0)                           AS total_revenue,
    ROUND(AVG(o.order_value), 2)                           AS avg_order_value,
    ROUND(AVG(o.delivery_time_mins), 1)                    AS avg_delivery_mins,
    SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) AS cancellations,
    ROUND(
        100.0 * SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END)
        / COUNT(o.order_id), 2
    )                                                       AS cancellation_rate,
    COUNT(DISTINCT o.customer_id)                          AS unique_customers
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.city
ORDER BY total_orders DESC;


-- Which cities have the highest repeat customer rate?
WITH customer_orders AS (
    SELECT
        c.city,
        o.customer_id,
        COUNT(o.order_id) AS order_count
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE o.status = 'Delivered'
    GROUP BY c.city, o.customer_id
)
SELECT
    city,
    COUNT(customer_id)                                          AS total_customers,
    SUM(CASE WHEN order_count >= 5 THEN 1 ELSE 0 END)         AS loyal_customers,
    ROUND(
        100.0 * SUM(CASE WHEN order_count >= 5 THEN 1 ELSE 0 END)
        / COUNT(customer_id), 1
    )                                                           AS loyalty_rate_pct
FROM customer_orders
GROUP BY city
ORDER BY loyalty_rate_pct DESC;
