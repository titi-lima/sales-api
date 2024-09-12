SELECT 
  order_products.product_id,
  SUM(order_products.quantity) as total_quantity,
  SUM(order_products.subtotal) as total_price,
  MAX(orders.ordered_at) as last_ordered_at
FROM 
  order_products
JOIN 
  orders ON order_products.order_id = orders.id
WHERE 
  orders.status NOT IN ('CART')
AND 
  orders.ordered_at BETWEEN $1 AND $2
GROUP BY 
  order_products.product_id
ORDER BY 
  last_ordered_at DESC
