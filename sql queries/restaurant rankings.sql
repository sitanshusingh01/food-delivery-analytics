-- Top restaurants by total revenue
-- Using window function to rank within each city as well

SELECT
    r.name,
    r.city,
    r.cuisine_type,
    r.avg_rating,
    COUNT(o.order_id)            AS total_orders,
    ROUND(SUM(o.order_value), 0) AS total_revenue,
    ROUND(AVG(o.order_value), 2) AS avg_order_value,
    RANK() OVER (ORDER BY SUM(o.order_value) DESC)           AS overall_rank,
    RANK() OVER (
        PARTITION BY r.city
        ORDER BY SUM(o.order_value) DESC
    )                                                         AS city_rank
FROM orders o
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.status = 'Delivered'
GROUP BY r.restaurant_id, r.name, r.city, r.cuisine_type, r.avg_rating
ORDER BY total_revenue DESC
LIMIT 20;


-- Does rating actually predict order volume?
SELECT
    CASE
        WHEN avg_rating >= 4.5 THEN '4.5+'
        WHEN avg_rating >= 4.2 THEN '4.2–4.5'
        WHEN avg_rating >= 4.0 THEN '4.0–4.2'
        WHEN avg_rating >= 3.5 THEN '3.5–4.0'
        ELSE 'below 3.5'
    END AS rating_bucket,
    COUNT(r.restaurant_id)         AS restaurant_count,
    ROUND(AVG(total_orders), 0)    AS avg_monthly_orders
FROM restaurants r
JOIN (
    SELECT restaurant_id, COUNT(order_id) AS total_orders
    FROM orders
    WHERE status = 'Delivered'
    GROUP BY restaurant_id
) order_counts ON r.restaurant_id = order_counts.restaurant_id
GROUP BY rating_bucket
ORDER BY avg_monthly_orders DESC;
