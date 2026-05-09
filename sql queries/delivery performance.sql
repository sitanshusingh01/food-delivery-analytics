-- City-wise delivery SLA analysis
-- Finding which cities have the worst late delivery problem

SELECT
    c.city,
    COUNT(o.order_id)                                           AS total_orders,
    ROUND(AVG(o.delivery_time_mins), 1)                        AS avg_delivery_time,
    SUM(CASE WHEN o.delivery_time_mins > 45
             THEN 1 ELSE 0 END)                                AS late_deliveries,
    ROUND(
        100.0 * SUM(CASE WHEN o.delivery_time_mins > 45
                         THEN 1 ELSE 0 END)
        / COUNT(o.order_id), 2
    )                                                           AS late_pct
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.city
ORDER BY late_pct DESC;


-- Peak hour analysis — which hours have the most late deliveries?
SELECT
    EXTRACT(HOUR FROM order_date) AS hour_of_day,
    COUNT(order_id)               AS total_orders,
    SUM(CASE WHEN delivery_time_mins > 45 THEN 1 ELSE 0 END) AS late_count,
    ROUND(
        100.0 * SUM(CASE WHEN delivery_time_mins > 45 THEN 1 ELSE 0 END)
        / COUNT(order_id), 1
    )                             AS late_pct
FROM orders
WHERE status = 'Delivered'
GROUP BY EXTRACT(HOUR FROM order_date)
ORDER BY hour_of_day;


-- Rider efficiency — how does delivery count per shift affect on-time rate?
SELECT
    dp.rider_id,
    dp.city,
    dp.total_deliveries,
    ROUND(dp.avg_delivery_time, 1) AS avg_delivery_time,
    ROUND(dp.on_time_rate * 100, 1) AS on_time_pct,
    CASE
        WHEN dp.total_deliveries < 8  THEN 'under-utilized'
        WHEN dp.total_deliveries <= 12 THEN 'optimal'
        ELSE 'over-extended'
    END AS rider_load_category
FROM delivery_partners dp
ORDER BY dp.on_time_rate DESC;
