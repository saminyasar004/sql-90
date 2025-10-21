// export const questions = [{
//   id: 1,
//   title: 'Quick Look at the Data',
//   difficulty: 'Easy',
//   tags: ['SELECT', 'Basics'],
//   description: 'List any 5 records from the orders table.',
//   completed: true,
//   solution: `SELECT *
//     FROM orders LIMIT 5;`
// }, {
//   id: 2,
//   title: 'Second Class Deliveries',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Filtering'],
//   description: 'Retrieve all order IDs where the shipping mode is "Second Class".',
//   completed: true,
//   solution: `SELECT order_id FROM orders WHERE ship_mode = "Second Class";`
// }, {
//   id: 3,
//   title: 'The Discount Hunt',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Filtering'],
//   description: 'List all records from the orders table where the discount is greater than 20%.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE discount > 0.2;'
// }, {
//   id: 4,
//   title: 'High-Impact Transactions',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Filtering'],
//   description: 'Find records from the orders table where sales exceed $500.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE sales > 500;'
// }, {
//   id: 5,
//   title: 'Office Supplies',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Filtering'],
//   description: 'List all product names in the "Office Supplies" category.',
//   completed: false,
//   solution: 'SELECT product_name FROM products WHERE category = "Office Supplies";'
// }, {
//   id: 6,
//   title: 'Zooming into 2017',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Date Filtering'],
//   description: 'From the orders table, return all rows of orders placed in 2017.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017;'
// }, {
//   id: 7,
//   title: 'Region Rivalry',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Aggregation'],
//   description: 'Find the total sales for each region. Sort by sales, descending.',
//   completed: false,
//   solution: 'SELECT region, SUM(sales) AS total_sales FROM orders GROUP BY region ORDER BY total_sales DESC;'
// }, {
//   id: 8,
//   title: 'Category Profits',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Aggregation'],
//   description: 'Calculate the total profit for each category.',
//   completed: false,
//   solution: 'SELECT category, SUM(profit) AS total_profit FROM orders GROUP BY category;'
// }, {
//   id: 9,
//   title: 'Shipping Modes',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'COUNT'],
//   description: 'Find the total number of orders for each shipping mode.',
//   completed: false,
//   solution: 'SELECT ship_mode, COUNT(*) AS order_count FROM orders GROUP BY ship_mode;'
// }, {
//   id: 10,
//   title: 'Subcategory Sales Averages',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'AVG'],
//   description: 'Find the average sales per sub-category, ordered from highest to lowest.',
//   completed: false,
//   solution: 'SELECT sub_category, AVG(sales) AS avg_sales FROM orders GROUP BY sub_category ORDER BY avg_sales DESC;'
// }, {
//   id: 11,
//   title: 'Profit Champions',
//   difficulty: 'Easy',
//   tags: ['ORDER BY', 'LIMIT'],
//   description: 'Find the top 3 orders with the highest profit. Output order_id and total_profit.',
//   completed: false,
//   solution: 'SELECT order_id, profit AS total_profit FROM orders ORDER BY profit DESC LIMIT 3;'
// }, {
//   id: 12,
//   title: "Who's Bringing the Bucks?",
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Aggregation'],
//   description: 'Identify the 5 customers with the highest total sales. Output customer_id and total_sales.',
//   completed: false,
//   solution: 'SELECT customer_id, SUM(sales) AS total_sales FROM orders GROUP BY customer_id ORDER BY total_sales DESC LIMIT 5;'
// }, {
//   id: 13,
//   title: "It's in the Margins!",
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Calculated Fields'],
//   description: 'List all records from the orders table where the profit margin exceeds 30%.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE (profit / sales) > 0.3;'
// }, {
//   id: 14,
//   title: 'Shipping Speedsters',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'AVG', 'Date Functions'],
//   description: 'Calculate the average delivery time (in days) for each shipping mode.',
//   completed: false,
//   solution: 'SELECT ship_mode, AVG(DATEDIFF(ship_date, order_date)) AS avg_delivery_time FROM orders GROUP BY ship_mode;'
// }, {
//   id: 15,
//   title: 'Subcategory Champions',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Aggregation'],
//   description: 'Find the top 2 product subcategories with the highest total sales. Output sub_category and total_sales.',
//   completed: false,
//   solution: 'SELECT sub_category, SUM(sales) AS total_sales FROM orders GROUP BY sub_category ORDER BY total_sales DESC LIMIT 2;'
// }, {
//   id: 16,
//   title: 'Annual Sales',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Date Functions'],
//   description: 'Calculate the total sales for each year, ordered chronologically.',
//   completed: false,
//   solution: 'SELECT EXTRACT(YEAR FROM order_date) AS year, SUM(sales) AS total_sales FROM orders GROUP BY year ORDER BY year;'
// }, {
//   id: 17,
//   title: 'High Discount, High Sales',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'AND'],
//   description: 'List all records from the orders table where sales exceed $500 and discount is greater than 20%.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE sales > 500 AND discount > 0.2;'
// }, {
//   id: 18,
//   title: 'Central Region',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'Filtering'],
//   description: 'Retrieve all order IDs from the Central region.',
//   completed: false,
//   solution: 'SELECT order_id FROM orders WHERE region = "Central";'
// }, {
//   id: 19,
//   title: '2017 Monthly Sales',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Date Functions'],
//   description: 'Calculate total sales for each month in 2017.',
//   completed: false,
//   solution: 'SELECT EXTRACT(MONTH FROM order_date) AS month, SUM(sales) AS total_sales FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017 GROUP BY month ORDER BY month;'
// }, {
//   id: 20,
//   title: 'Shipping Profitability',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Calculated Fields'],
//   description: 'Return the average profit margin for each shipping mode. Round to two decimal places.',
//   completed: false,
//   solution: 'SELECT ship_mode, ROUND(AVG(profit / sales), 2) AS avg_profit_margin FROM orders GROUP BY ship_mode;'
// }, {
//   id: 21,
//   title: 'Total Discount',
//   difficulty: 'Easy',
//   tags: ['SUM', 'Aggregation'],
//   description: 'Return the total discount amount given across all orders.',
//   completed: false,
//   solution: 'SELECT SUM(sales * discount) AS total_discount_amount FROM orders;'
// }, {
//   id: 22,
//   title: 'Tables & Chairs',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'IN', 'ORDER BY'],
//   description: 'List all product names under the "Tables" or "Chairs" subcategories, ordered alphabetically.',
//   completed: false,
//   solution: 'SELECT product_name FROM products WHERE sub_category IN ("Tables", "Chairs") ORDER BY product_name;'
// }, {
//   id: 23,
//   title: 'Big & Bulk Orders',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'AND'],
//   description: 'List all records from the orders table with profit greater than 500 and quantity greater than 10 units.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE profit > 500 AND quantity > 10;'
// }, {
//   id: 24,
//   title: 'Lucky Customers',
//   difficulty: 'Easy',
//   tags: ['COUNT', 'DISTINCT', 'WHERE'],
//   description: 'How many unique customers received a discount of more than 70% on any product?',
//   completed: false,
//   solution: 'SELECT COUNT(DISTINCT customer_id) AS customer_count FROM orders WHERE discount > 0.7;'
// }, {
//   id: 25,
//   title: '3000 Profit Club',
//   difficulty: 'Easy',
//   tags: ['WHERE', 'ORDER BY', 'ROUND'],
//   description: 'List all orders where total profit exceeded $3000. Output order_id, total_profit (rounded to 2 decimal places), sorted from highest to lowest profit.',
//   completed: false,
//   solution: 'SELECT order_id, ROUND(profit, 2) AS total_profit FROM orders WHERE profit > 3000 ORDER BY profit DESC;'
// }, {
//   id: 26,
//   title: 'First Time to Ten',
//   difficulty: 'Easy',
//   tags: ['ORDER BY', 'LIMIT'],
//   description: 'When was the first time more than 10 units of a product were sold in a single order? Output the order date.',
//   completed: false,
//   solution: 'SELECT order_date FROM orders WHERE quantity > 10 ORDER BY order_date ASC LIMIT 1;'
// }, {
//   id: 27,
//   title: 'White Winners',
//   difficulty: 'Easy',
//   tags: ['LIKE', 'Pattern Matching'],
//   description: 'List all product names that contain the word "White".',
//   completed: false,
//   solution: 'SELECT product_name FROM products WHERE product_name LIKE "%White%";'
// }, {
//   id: 28,
//   title: '2015 to 2017',
//   difficulty: 'Easy',
//   tags: ['BETWEEN', 'Date Filtering'],
//   description: 'Return all records from the orders table that were ordered between 2015 and 2017, inclusive.',
//   completed: false,
//   solution: 'SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) BETWEEN 2015 AND 2017;'
// }, {
//   id: 29,
//   title: 'Top 10 Customers',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'ORDER BY', 'LIMIT'],
//   description: 'Find the top 10 customers by profit. Output customer_name, total_profit (rounded to 2 decimal places), sorted descending.',
//   completed: false,
//   solution: 'SELECT customer_name, ROUND(SUM(profit), 2) AS total_profit FROM orders GROUP BY customer_name ORDER BY total_profit DESC LIMIT 10;'
// }, {
//   id: 30,
//   title: 'Lost Sales',
//   difficulty: 'Easy',
//   tags: ['SUM', 'WHERE'],
//   description: 'Calculate the total value of sales lost due to returned orders. Output as lost_sales.',
//   completed: false,
//   solution: 'SELECT SUM(sales) AS lost_sales FROM orders WHERE returned = "Yes";'
// }, {
//   id: 31,
//   title: 'Subcategory Distribution',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'COUNT'],
//   description: 'Return the number of products in each subcategory, sorted from highest to lowest.',
//   completed: false,
//   solution: 'SELECT sub_category, COUNT(*) AS product_count FROM products GROUP BY sub_category ORDER BY product_count DESC;'
// }, {
//   id: 32,
//   title: 'Categories & Subcategories',
//   difficulty: 'Easy',
//   tags: ['DISTINCT', 'ORDER BY'],
//   description: 'List each product category and its corresponding subcategories. The output should contain two columns, category and subcategory, sorted alphabetically.',
//   completed: false,
//   solution: 'SELECT DISTINCT category, sub_category FROM products ORDER BY category, sub_category;'
// }, {
//   id: 33,
//   title: 'Overall Margin',
//   difficulty: 'Easy',
//   tags: ['AVG', 'Calculated Fields'],
//   description: 'Calculate the overall average profit margin percentage, rounded to two decimal places.',
//   completed: false,
//   solution: 'SELECT ROUND(AVG(profit / sales) * 100, 2) AS avg_profit_margin_pct FROM orders;'
// }, {
//   id: 34,
//   title: 'Marketing Fuel',
//   difficulty: 'Easy',
//   tags: ['SUM', 'Calculated Fields'],
//   description: "Superstore's marketing expense has always been 20% of sales. Based on this, calculate the overall marketing costs.",
//   completed: false,
//   solution: 'SELECT SUM(sales) * 0.2 AS marketing_costs FROM orders;'
// }, {
//   id: 35,
//   title: 'Segment AOVs',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'AVG'],
//   description: 'What is the average order value (AOV) per customer segment? Sort highest to lowest.',
//   completed: false,
//   solution: 'SELECT segment, AVG(sales) AS aov FROM orders GROUP BY segment ORDER BY aov DESC;'
// }, {
//   id: 36,
//   title: 'Lucrative States',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'ORDER BY', 'LIMIT'],
//   description: 'What are the 10 most profitable states?',
//   completed: false,
//   solution: 'SELECT state, SUM(profit) AS total_profit FROM orders GROUP BY state ORDER BY total_profit DESC LIMIT 10;'
// }, {
//   id: 37,
//   title: 'Turtle Region',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'AVG', 'Date Functions'],
//   description: 'Which region has the slowest average delivery time? Output the region and its average delivery time.',
//   completed: false,
//   solution: 'SELECT region, AVG(DATEDIFF(ship_date, order_date)) AS avg_delivery_time FROM orders GROUP BY region ORDER BY avg_delivery_time DESC LIMIT 1;'
// }, {
//   id: 38,
//   title: 'Peak Season',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Date Functions'],
//   description: 'Seasonality-wise, what are the top 3 months with highest sales? Output the month number and total sales.',
//   completed: false,
//   solution: 'SELECT EXTRACT(MONTH FROM order_date) AS month, SUM(sales) AS total_sales FROM orders GROUP BY month ORDER BY total_sales DESC LIMIT 3;'
// }, {
//   id: 39,
//   title: 'Lowest Low',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'Date Functions'],
//   description: 'Which day had the lowest total sales? If tied, return the earlier date.',
//   completed: false,
//   solution: 'SELECT order_date, SUM(sales) AS total_sales FROM orders GROUP BY order_date ORDER BY total_sales ASC, order_date ASC LIMIT 1;'
// }, {
//   id: 40,
//   title: 'Bestsellers',
//   difficulty: 'Easy',
//   tags: ['GROUP BY', 'ORDER BY', 'LIMIT'],
//   description: 'What are the top 5 best-selling products? Output product_name and total_sales.',
//   completed: false,
//   solution: 'SELECT product_name, SUM(sales) AS total_sales FROM orders GROUP BY product_name ORDER BY total_sales DESC LIMIT 5;'
// }, {
//   id: 41,
//   title: 'Variety in the Cart',
//   difficulty: 'Intermediate',
//   tags: ['GROUP BY', 'HAVING', 'COUNT', 'DISTINCT'],
//   description: 'List the names of customers who have purchased at least 30 different products. Output the customer name and the number of unique products bought. Sort by customer name, alphabetically.',
//   completed: false,
//   solution: 'SELECT customer_name, COUNT(DISTINCT product_id) AS unique_products FROM orders GROUP BY customer_name HAVING COUNT(DISTINCT product_id) >= 30 ORDER BY customer_name;'
// }, {
//   id: 42,
//   title: 'Derived Columns',
//   difficulty: 'Intermediate',
//   tags: ['CASE', 'Date Functions', 'Calculated Fields'],
//   description: 'Return all records from the orders table with two additional columns:\n- shipping_time: the number of days between ship_date and order_date\n- high_profit:\n  - "High" if profit > 500\n  - "Mid" if profit between 100 and 500 (inclusive)\n  - "Low" if profit < 100',
//   completed: false,
//   solution: 'SELECT *, DATEDIFF(ship_date, order_date) AS shipping_time, CASE WHEN profit > 500 THEN "High" WHEN profit >= 100 THEN "Mid" ELSE "Low" END AS high_profit FROM orders;'
// }, {
//   id: 43,
//   title: 'Returned Orders',
//   difficulty: 'Intermediate',
//   tags: ['Aggregation', 'Percentage', 'COUNT'],
//   description: 'What percentage of orders were returned?',
//   completed: false,
//   solution: 'SELECT ROUND(COUNT(CASE WHEN returned = "Yes" THEN 1 END) * 100.0 / COUNT(*), 2) AS return_percentage FROM orders;'
// }, {
//   id: 44,
//   title: 'Segment Return Rates',
//   difficulty: 'Intermediate',
//   tags: ['GROUP BY', 'Percentage', 'Aggregation'],
//   description: 'Calculate the return rate of orders by customer segment. Output segment, return_rate (rounded to 2 decimal places and shown with % sign). Sort by return rate in descending order.',
//   completed: false,
//   solution: 'SELECT segment, CONCAT(ROUND(COUNT(CASE WHEN returned = "Yes" THEN 1 END) * 100.0 / COUNT(*), 2), "%") AS return_rate FROM orders GROUP BY segment ORDER BY COUNT(CASE WHEN returned = "Yes" THEN 1 END) * 100.0 / COUNT(*) DESC;'
// }, {
//   id: 45,
//   title: 'Largest Quantity Transactions',
//   difficulty: 'Intermediate',
//   tags: ['Subquery', 'MAX'],
//   description: 'List all records from the orders table that have the highest quantity. Output order_id, product_id, sales, quantity, and profit.',
//   completed: false,
//   solution: 'SELECT order_id, product_id, sales, quantity, profit FROM orders WHERE quantity = (SELECT MAX(quantity) FROM orders);'
// }, {
//   id: 46,
//   title: 'Losing Products',
//   difficulty: 'Intermediate',
//   tags: ['GROUP BY', 'HAVING', 'Aggregation'],
//   description: 'Your boss asks you to find out all products that are incurring losses. List all products where total profit is less than 0. Output product_name and total_loss, sorted by highest to lowest loss.',
//   completed: false,
//   solution: 'SELECT product_name, SUM(profit) AS total_loss FROM orders GROUP BY product_name HAVING SUM(profit) < 0 ORDER BY total_loss ASC;'
// }, {
//   id: 47,
//   title: 'Fives of Extremes',
//   difficulty: 'Intermediate',
//   tags: ['UNION', 'ORDER BY', 'LIMIT'],
//   description: 'What are the top 5 products with highest profit and bottom 5 products with lowest profit? In one output, list the top 5 product names, followed by the bottom 5, along with their profit generated.',
//   completed: false,
//   solution: 'SELECT product_name, SUM(profit) AS total_profit FROM orders GROUP BY product_name ORDER BY total_profit DESC LIMIT 5 UNION ALL SELECT product_name, SUM(profit) AS total_profit FROM orders GROUP BY product_name ORDER BY total_profit ASC LIMIT 5;'
// }, {
//   id: 48,
//   title: 'Cleaning the ID',
//   difficulty: 'Intermediate',
//   tags: ['String Functions', 'REPLACE', 'SUBSTRING'],
//   description: 'Create a new column concat_id with the following transformations:\n- Remove hyphens and year from order_id (e.g., CA-2017-152156 → CA152156)\n- Remove hyphen from customer_id (e.g., CG-12520 → CG12520)\n- Remove hyphens and first 3 digits from product_id (e.g., FUR-BO-10001798 → FURBO01798)\n- Concatenate the cleaned values as: orderid-customerid-productid. Output concat_id, sorted alphabetically.',
//   completed: false,
//   solution: 'SELECT CONCAT(REPLACE(REGEXP_REPLACE(order_id, "-[0-9]{4}-", ""), "-", ""), "-", REPLACE(customer_id, "-", ""), "-", REPLACE(REGEXP_REPLACE(product_id, "-[0-9]{3}", ""), "-", "")) AS concat_id FROM orders ORDER BY concat_id;'
// }, {
//   id: 49,
//   title: 'California Orders',
//   difficulty: 'Intermediate',
//   tags: ['WHERE', 'AND', 'Date Functions'],
//   description: 'How many orders were shipped to California in 2018, excluding returned orders?',
//   completed: false,
//   solution: 'SELECT COUNT(*) AS california_orders FROM orders WHERE state = "California" AND EXTRACT(YEAR FROM order_date) = 2018 AND returned = "No";'
// }, {
//   id: 50,
//   title: 'Cities Leaderboard',
//   difficulty: 'Intermediate',
//   tags: ['RANK', 'Window Functions', 'GROUP BY'],
//   description: 'Rank the top 10 cities by total sales. Tied sales should share the same rank, with the next rank skipped accordingly. Output rank, city, total_sales.',
//   completed: false,
//   solution: 'WITH city_sales AS (SELECT city, SUM(sales) AS total_sales FROM orders GROUP BY city) SELECT RANK() OVER (ORDER BY total_sales DESC) AS rank, city, total_sales FROM city_sales LIMIT 10;'
// }, {
//   id: 51,
//   title: 'Cartesian Product',
//   difficulty: 'Intermediate',
//   tags: ['CROSS JOIN', 'Cartesian Product'],
//   description: 'List all possible combinations of customer name and product category. Output customer_name, category, sorted alphabetically.',
//   completed: false,
//   solution: 'SELECT DISTINCT customer_name, category FROM orders CROSS JOIN (SELECT DISTINCT category FROM orders) AS categories ORDER BY customer_name, category;'
// }, {
//   id: 52,
//   title: 'Lead and Lag',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'LEAD', 'LAG'],
//   description: 'Return the following for each day:\n- order_date\n- total_profit for that day\n- previous day profit\n- next day profit',
//   completed: false,
//   solution: 'SELECT order_date, SUM(profit) AS daily_profit, LAG(SUM(profit)) OVER (ORDER BY order_date) AS previous_day_profit, LEAD(SUM(profit)) OVER (ORDER BY order_date) AS next_day_profit FROM orders GROUP BY order_date ORDER BY order_date;'
// }, {
//   id: 53,
//   title: 'Running Sales',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'SUM', 'OVER'],
//   description: 'Return the row_id, order_id, product_id, sales, and a new column that calculates running/cumulative sales.',
//   completed: false,
//   solution: 'SELECT row_id, order_id, product_id, sales, SUM(sales) OVER (ORDER BY row_id) AS cumulative_sales FROM orders;'
// }, {
//   id: 54,
//   title: 'Top Recent Orders',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'ROW_NUMBER', 'PARTITION BY'],
//   description: 'For each customer, find their 3 most recent orders. If multiple orders share the same date, rank by highest sales. Each customer must have unique ranks from 1 to 3. Output customer_id, order_id, order_date, sales, profit, order_rank (with 1 being most recent).',
//   completed: false,
//   solution: 'WITH ranked_orders AS (SELECT customer_id, order_id, order_date, sales, profit, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, sales DESC) AS order_rank FROM orders) SELECT * FROM ranked_orders WHERE order_rank <= 3 ORDER BY customer_id, order_rank;'
// }, {
//   id: 55,
//   title: 'Model Customers',
//   difficulty: 'Intermediate',
//   tags: ['NOT IN', 'Subquery'],
//   description: 'Find the names of customers who have placed orders but have never returned any of them.',
//   completed: false,
//   solution: 'SELECT DISTINCT customer_name FROM orders WHERE customer_name NOT IN (SELECT DISTINCT customer_name FROM orders WHERE returned = "Yes");'
// }, {
//   id: 56,
//   title: 'East & West',
//   difficulty: 'Intermediate',
//   tags: ['INTERSECT', 'Subquery'],
//   description: 'Find customer names who have ordered both "Office Supplies" and "Technology" products. Sort alphabetically.',
//   completed: false,
//   solution: 'SELECT DISTINCT customer_name FROM orders WHERE category = "Office Supplies" INTERSECT SELECT DISTINCT customer_name FROM orders WHERE category = "Technology" ORDER BY customer_name;'
// }, {
//   id: 57,
//   title: 'Customer Rank',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'PERCENT_RANK'],
//   description: "Show each customer's name, total sales, and their percentile rank based on total sales. Output customer_name, total_sales, percentile_rank (as a % rounded to 2 decimal places).",
//   completed: false,
//   solution: 'SELECT customer_name, SUM(sales) AS total_sales, ROUND(PERCENT_RANK() OVER (ORDER BY SUM(sales)) * 100, 2) AS percentile_rank FROM orders GROUP BY customer_name ORDER BY total_sales DESC;'
// }, {
//   id: 58,
//   title: 'Two Orders, Different Quantity',
//   difficulty: 'Intermediate',
//   tags: ['Self Join', 'Window Functions'],
//   description: 'Find customers who have ordered the same product at least twice, where their second order had a lower quantity. Output customer_id, product_id, order1, order2, quantity1, and quantity2. Sort ascending by customer_id and product_id.',
//   completed: false,
//   solution: 'SELECT o1.customer_id, o1.product_id, o1.order_id AS order1, o2.order_id AS order2, o1.quantity AS quantity1, o2.quantity AS quantity2 FROM orders o1 JOIN orders o2 ON o1.customer_id = o2.customer_id AND o1.product_id = o2.product_id AND o1.order_id < o2.order_id AND o1.quantity > o2.quantity ORDER BY o1.customer_id, o1.product_id;'
// }, {
//   id: 59,
//   title: 'Binary Returns',
//   difficulty: 'Intermediate',
//   tags: ['CASE', 'BOOLEAN'],
//   description: 'List all order IDs with a boolean column showing whether or not the order was returned. Output order_id, returned_binary (TRUE for returned, FALSE otherwise).',
//   completed: false,
//   solution: 'SELECT order_id, CASE WHEN returned = "Yes" THEN TRUE ELSE FALSE END AS returned_binary FROM orders;'
// }, {
//   id: 60,
//   title: '11th to 15th',
//   difficulty: 'Intermediate',
//   tags: ['LIMIT', 'OFFSET', 'Subquery'],
//   description: 'List the 11th to 15th top products based on total profit. Output product_name, category, sub_category, profit. Hint: Do not use RANK or DENSE_RANK.',
//   completed: false,
//   solution: 'SELECT product_name, category, sub_category, SUM(profit) AS total_profit FROM orders GROUP BY product_name, category, sub_category ORDER BY total_profit DESC LIMIT 5 OFFSET 10;'
// }, {
//   id: 61,
//   title: 'First to Second Purchase',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'AVG', 'Date Functions'],
//   description: "Calculate the average number of days between a customer's first and second order.",
//   completed: false,
//   solution: 'WITH customer_orders AS (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_num FROM orders) SELECT AVG(DATEDIFF(o2.order_date, o1.order_date)) AS avg_days FROM customer_orders o1 JOIN customer_orders o2 ON o1.customer_id = o2.customer_id AND o1.order_num = 1 AND o2.order_num = 2;'
// }, {
//   id: 62,
//   title: 'Monthly Cohorts',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'Date Functions', 'GROUP BY'],
//   description: 'Find out how many new customers were acquired in each month, based on their first purchase date. Output cohort_month and customers_acquired.',
//   completed: false,
//   solution: 'WITH first_purchases AS (SELECT customer_id, MIN(order_date) AS first_purchase_date FROM orders GROUP BY customer_id) SELECT DATE_FORMAT(first_purchase_date, "%Y-%m") AS cohort_month, COUNT(*) AS customers_acquired FROM first_purchases GROUP BY cohort_month ORDER BY cohort_month;'
// }, {
//   id: 63,
//   title: 'A Special Group By',
//   difficulty: 'Intermediate',
//   tags: ['ROLLUP', 'GROUPING SETS', 'UNION ALL'],
//   description: 'Show total sales grouped by both region and category, including subtotals for each region and a grand total at the bottom. Subtotal rows should display the region name with the category labeled as "Subtotal" while the grand total row should have a blank region and the category labeled as "Grand Total". Output region, category, and sales, sorted by region and sales in ascending order.',
//   completed: false,
//   solution: 'SELECT COALESCE(region, "") AS region, CASE WHEN category IS NULL AND region IS NULL THEN "Grand Total" WHEN category IS NULL THEN "Subtotal" ELSE category END AS category, SUM(sales) AS sales FROM orders GROUP BY ROLLUP(region, category) ORDER BY region, sales ASC;'
// }, {
//   id: 64,
//   title: 'Power of Top 10',
//   difficulty: 'Intermediate',
//   tags: ['Subquery', 'Percentage', 'TOP'],
//   description: 'What percentage of total revenue comes from the top 10 best-selling products? Output top10_pct, rounded to 2 decimal places with a % sign.',
//   completed: false,
//   solution: 'WITH product_sales AS (SELECT product_name, SUM(sales) AS total_sales FROM orders GROUP BY product_name ORDER BY total_sales DESC), top_10 AS (SELECT SUM(total_sales) AS top_10_sales FROM (SELECT total_sales FROM product_sales LIMIT 10) t) SELECT CONCAT(ROUND((top_10_sales / (SELECT SUM(sales) FROM orders)) * 100, 2), "%") AS top10_pct FROM top_10;'
// }, {
//   id: 65,
//   title: 'Reward Time',
//   difficulty: 'Intermediate',
//   tags: ['Date Functions', 'CEILING', 'CAST'],
//   description: 'Assuming today is January 1, 2018, find all customers who have been with the store for at least 34 months. For each, calculate a voucher amount based on 5% of their total revenue, round up to the nearest multiple of 5, and explicitly cast the result as an integer. Output customer_id, customer_name, total_sales, voucher_amt, sorted by voucher_amt descending.',
//   completed: false,
//   solution: 'WITH customer_first_order AS (SELECT customer_id, customer_name, MIN(order_date) AS first_order_date, SUM(sales) AS total_sales FROM orders GROUP BY customer_id, customer_name) SELECT customer_id, customer_name, total_sales, CAST(CEILING(total_sales * 0.05 / 5) * 5 AS INTEGER) AS voucher_amt FROM customer_first_order WHERE DATEDIFF("2018-01-01", first_order_date) >= 34 * 30 ORDER BY voucher_amt DESC;'
// }, {
//   id: 66,
//   title: 'New in March',
//   difficulty: 'Intermediate',
//   tags: ['Date Functions', 'Subquery', 'COUNT'],
//   description: 'Find the number of new customers acquired in March 2017.',
//   completed: false,
//   solution: 'SELECT COUNT(*) AS new_customers FROM (SELECT customer_id, MIN(order_date) AS first_order_date FROM orders GROUP BY customer_id) first_orders WHERE EXTRACT(YEAR FROM first_order_date) = 2017 AND EXTRACT(MONTH FROM first_order_date) = 3;'
// }, {
//   id: 67,
//   title: 'No Chairs, No Tables',
//   difficulty: 'Intermediate',
//   tags: ['NOT IN', 'Subquery'],
//   description: 'List all customers who have never purchased products from the "Chairs" or "Tables" sub-categories.',
//   completed: false,
//   solution: 'SELECT DISTINCT customer_name FROM orders WHERE customer_name NOT IN (SELECT DISTINCT customer_name FROM orders WHERE sub_category IN ("Chairs", "Tables"));'
// }, {
//   id: 68,
//   title: 'Champion Subcategories',
//   difficulty: 'Intermediate',
//   tags: ['Window Functions', 'RANK', 'GROUP BY'],
//   description: 'Return the most profitable sub-category for each year. Output year, sub_category, total_profit, sorted by year ascending.',
//   completed: false,
//   solution: 'WITH yearly_subcategory_profit AS (SELECT EXTRACT(YEAR FROM order_date) AS year, sub_category, SUM(profit) AS total_profit, RANK() OVER (PARTITION BY EXTRACT(YEAR FROM order_date) ORDER BY SUM(profit) DESC) AS profit_rank FROM orders GROUP BY year, sub_category) SELECT year, sub_category, total_profit FROM yearly_subcategory_profit WHERE profit_rank = 1 ORDER BY year ASC;'
// }, {
//   id: 69,
//   title: 'PQR 500 Club',
//   difficulty: 'Intermediate',
//   tags: ['Calculated Fields', 'ORDER BY'],
//   description: 'Your boss asks you to track a new metric PQR (Profit-to-Quantity Ratio), defined as profit divided by quantity. List all orders with PQR > 500. Output order_id and pqr, sorted by pqr descending.',
//   completed: false,
//   solution: 'SELECT order_id, profit / quantity AS pqr FROM orders WHERE profit / quantity > 500 ORDER BY pqr DESC;'
// }, {
//   id: 70,
//   title: 'Annual Retention',
//   difficulty: 'Intermediate',
//   tags: ['INTERSECT', 'Percentage', 'Date Functions'],
//   description: 'What percentage of customers who purchased something in 2016 also made a purchase in 2017?',
//   completed: false,
//   solution: 'SELECT (COUNT(DISTINCT customers_2017.customer_id) * 100.0 / COUNT(DISTINCT customers_2016.customer_id)) AS retention_rate FROM (SELECT DISTINCT customer_id FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2016) customers_2016 LEFT JOIN (SELECT DISTINCT customer_id FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017) customers_2017 ON customers_2016.customer_id = customers_2017.customer_id;'
// }, {
//   id: 71,
//   title: 'Top 5 Products per Region',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'RANK', 'GROUP BY'],
//   description: 'Find the top 5 ranked products by units sold separately in the East and West regions. Each region should have its own top 5 list, ranked by total units sold. Ties should receive the same rank, and the next rank should not be skipped. Output region, product_name, total_units_sold, rank.',
//   completed: false,
//   solution: 'WITH regional_products AS (SELECT region, product_name, SUM(quantity) AS total_units_sold, RANK() OVER (PARTITION BY region ORDER BY SUM(quantity) DESC) AS rank FROM orders WHERE region IN ("East", "West") GROUP BY region, product_name) SELECT * FROM regional_products WHERE rank <= 5 ORDER BY region, rank;'
// }, {
//   id: 72,
//   title: 'Product Groups',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'NTILE', 'GROUP BY'],
//   description: 'Using the orders table, rank products into 4 quartiles based on total sales. Only include products that were ordered at least 10 times. Output product_id, total_sales, sales_quartile (1 = top 25%, 4 = bottom 25%).',
//   completed: false,
//   solution: 'WITH product_stats AS (SELECT product_id, SUM(sales) AS total_sales, COUNT(*) AS order_count FROM orders GROUP BY product_id HAVING COUNT(*) >= 10) SELECT product_id, total_sales, NTILE(4) OVER (ORDER BY total_sales DESC) AS sales_quartile FROM product_stats ORDER BY sales_quartile, total_sales DESC;'
// }, {
//   id: 73,
//   title: 'Long Format',
//   difficulty: 'Hard',
//   tags: ['UNION ALL', 'Formatting'],
//   description: 'Create a long-format view with one row per metric (sales, profit, quantity) for each product in all 2017 orders that were shipped via "Standard Class". Output order_id, product_id, metric, value. Sort by order_id, product_id, and metric.',
//   completed: false,
//   solution: 'SELECT order_id, product_id, "sales" AS metric, sales AS value FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017 AND ship_mode = "Standard Class" UNION ALL SELECT order_id, product_id, "profit" AS metric, profit AS value FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017 AND ship_mode = "Standard Class" UNION ALL SELECT order_id, product_id, "quantity" AS metric, quantity AS value FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017 AND ship_mode = "Standard Class" ORDER BY order_id, product_id, metric;'
// }, {
//   id: 74,
//   title: 'Crosstab',
//   difficulty: 'Hard',
//   tags: ['Pivot', 'CASE', 'GROUP BY'],
//   description: 'Generate a pivot table showing total profit by sub_category and region for orders in 2017. Only include sub-categories with at least 50 orders. Output one row per sub_category, separate columns for each region, and a column for total profit. Sort by total_profit, descending',
//   completed: false,
//   solution: 'WITH subcategory_counts AS (SELECT sub_category, COUNT(*) AS order_count FROM orders GROUP BY sub_category HAVING COUNT(*) >= 50) SELECT o.sub_category, SUM(CASE WHEN o.region = "East" THEN o.profit ELSE 0 END) AS east_profit, SUM(CASE WHEN o.region = "West" THEN o.profit ELSE 0 END) AS west_profit, SUM(CASE WHEN o.region = "Central" THEN o.profit ELSE 0 END) AS central_profit, SUM(CASE WHEN o.region = "South" THEN o.profit ELSE 0 END) AS south_profit, SUM(o.profit) AS total_profit FROM orders o JOIN subcategory_counts sc ON o.sub_category = sc.sub_category WHERE EXTRACT(YEAR FROM o.order_date) = 2017 GROUP BY o.sub_category ORDER BY total_profit DESC;'
// }, {
//   id: 75,
//   title: 'Basket of Pairs',
//   difficulty: 'Hard',
//   tags: ['Self Join', 'Market Basket Analysis'],
//   description: "Perform a market basket analysis to identify the most frequently purchased pairs of sub-categories (e.g., Binders and Paper). Calculate the \"Support\" for each pair, which is the proportion of orders in which both sub-categories appear together. Output three columns: the sub-category pair (e.g., Binders, Paper), the number of orders they appear in together, and the Support %. There should only be one row for each pair combination (e.g., 'Binders, Paper' and 'Paper, Binders' should not appear twice).",
//   completed: false,
//   solution: 'WITH distinct_subcategories AS (SELECT DISTINCT order_id, sub_category FROM orders), total_orders AS (SELECT COUNT(DISTINCT order_id) AS total FROM orders), subcategory_pairs AS (SELECT a.sub_category AS sub_category1, b.sub_category AS sub_category2, COUNT(DISTINCT a.order_id) AS pair_count FROM distinct_subcategories a JOIN distinct_subcategories b ON a.order_id = b.order_id AND a.sub_category < b.sub_category GROUP BY a.sub_category, b.sub_category) SELECT CONCAT(sub_category1, ", ", sub_category2) AS subcategory_pair, pair_count, ROUND(pair_count * 100.0 / (SELECT total FROM total_orders), 2) AS support_percent FROM subcategory_pairs ORDER BY pair_count DESC;'
// }, {
//   id: 76,
//   title: 'YoY Sales',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'LAG', 'Date Functions'],
//   description: 'Return annual total sales along with the year-over-year (YoY) percentage change compared to the previous year. Output year, total_sales, yoy_change_percent.',
//   completed: false,
//   solution: 'WITH yearly_sales AS (SELECT EXTRACT(YEAR FROM order_date) AS year, SUM(sales) AS total_sales FROM orders GROUP BY year ORDER BY year) SELECT year, total_sales, ROUND((total_sales - LAG(total_sales) OVER (ORDER BY year)) * 100.0 / LAG(total_sales) OVER (ORDER BY year), 2) AS yoy_change_percent FROM yearly_sales;'
// }, {
//   id: 77,
//   title: 'Repeat Customers',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'CTE', 'Date Functions'],
//   description: 'Calculate the revenue contribution of returning vs new customers in December 2017. Output customer_type (new or returning), total_revenue, and contribution_pct.',
//   completed: false,
//   solution: 'WITH customer_first_order AS (SELECT customer_id, MIN(order_date) AS first_order_date FROM orders GROUP BY customer_id), december_orders AS (SELECT o.customer_id, o.sales, CASE WHEN o.order_date > DATEADD(month, 1, cfo.first_order_date) THEN "returning" ELSE "new" END AS customer_type FROM orders o JOIN customer_first_order cfo ON o.customer_id = cfo.customer_id WHERE EXTRACT(YEAR FROM o.order_date) = 2017 AND EXTRACT(MONTH FROM o.order_date) = 12), totals AS (SELECT customer_type, SUM(sales) AS total_revenue FROM december_orders GROUP BY customer_type) SELECT customer_type, total_revenue, ROUND(total_revenue * 100.0 / (SELECT SUM(total_revenue) FROM totals), 2) AS contribution_pct FROM totals ORDER BY total_revenue DESC;'
// }, {
//   id: 78,
//   title: 'First Product',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'FIRST_VALUE', 'Date Functions'],
//   description: 'For every order placed in 2018, return the product ordered in that row and the first product the customer ever ordered. Output order_id, customer_id, order_date, product in the order, and the first product the customer ever ordered.',
//   completed: false,
//   solution: 'WITH first_products AS (SELECT customer_id, product_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_num FROM orders) SELECT o.order_id, o.customer_id, o.order_date, o.product_id AS current_product, fp.product_id AS first_product FROM orders o JOIN first_products fp ON o.customer_id = fp.customer_id AND fp.order_num = 1 WHERE EXTRACT(YEAR FROM o.order_date) = 2018 ORDER BY o.order_date, o.order_id;'
// }, {
//   id: 79,
//   title: 'Basket Confidence',
//   difficulty: 'Hard',
//   tags: ['Conditional Probability', 'Market Basket Analysis'],
//   description: 'Calculate the confidence (conditional probability) that an order contains both Binders and Paper, given it contains Storage products. Use the product subcategory column.',
//   completed: false,
//   solution: 'WITH storage_orders AS (SELECT DISTINCT order_id FROM orders WHERE sub_category = "Storage"), binders_paper_orders AS (SELECT DISTINCT order_id FROM orders WHERE sub_category = "Binders" INTERSECT SELECT DISTINCT order_id FROM orders WHERE sub_category = "Paper"), both_conditions AS (SELECT COUNT(DISTINCT so.order_id) AS count FROM storage_orders so JOIN binders_paper_orders bpo ON so.order_id = bpo.order_id) SELECT (SELECT count FROM both_conditions) * 100.0 / (SELECT COUNT(DISTINCT order_id) FROM storage_orders) AS confidence_percentage;'
// }, {
//   id: 80,
//   title: 'Basket Support',
//   difficulty: 'Hard',
//   tags: ['Joint Probability', 'Market Basket Analysis'],
//   description: 'Calculate the support (joint probability) that an order includes all three subcategories: Binders, Phones, and Paper.',
//   completed: false,
//   solution: 'WITH total_orders AS (SELECT COUNT(DISTINCT order_id) AS count FROM orders), target_orders AS (SELECT COUNT(DISTINCT o1.order_id) AS count FROM orders o1 JOIN orders o2 ON o1.order_id = o2.order_id AND o2.sub_category = "Phones" JOIN orders o3 ON o1.order_id = o3.order_id AND o3.sub_category = "Paper" WHERE o1.sub_category = "Binders") SELECT (SELECT count FROM target_orders) * 100.0 / (SELECT count FROM total_orders) AS support_percentage;'
// }, {
//   id: 81,
//   title: 'Threes of Extremes',
//   difficulty: 'Hard',
//   tags: ['UNION', 'Window Functions', 'RANK'],
//   description: 'Find the 3 distinct highest and 3 distinct lowest daily sales values. Assign a rank from 1 to 3 separately for the highest sales values (1 = highest) and lowest sales values (1 = lowest). Output the rank and sales value, with the highest 3 sales values shown first followed by the lowest 3 sales values.',
//   completed: false,
//   solution: 'WITH daily_sales AS (SELECT order_date, SUM(sales) AS total_sales FROM orders GROUP BY order_date), high_sales AS (SELECT total_sales, RANK() OVER (ORDER BY total_sales DESC) AS rank FROM daily_sales), low_sales AS (SELECT total_sales, RANK() OVER (ORDER BY total_sales ASC) AS rank FROM daily_sales) SELECT rank, total_sales FROM high_sales WHERE rank <= 3 UNION ALL SELECT rank, total_sales FROM low_sales WHERE rank <= 3 ORDER BY total_sales DESC;'
// }, {
//   id: 82,
//   title: 'Monthly Returning Customers',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'Date Functions', 'Percentage'],
//   description: 'Calculate the returning customer percentage for each month -that is, the percentage of customers who made a purchase in a given month and had also made a purchase in any previous month. Output the order year, order month, total customers, returning customers, and returning customer percent.',
//   completed: false,
//   solution: 'WITH customer_months AS (SELECT customer_id, EXTRACT(YEAR FROM order_date) AS year, EXTRACT(MONTH FROM order_date) AS month, MIN(order_date) OVER (PARTITION BY customer_id) AS first_purchase_date FROM orders GROUP BY customer_id, year, month), monthly_stats AS (SELECT year, month, COUNT(DISTINCT customer_id) AS total_customers, COUNT(DISTINCT CASE WHEN DATE_TRUNC("month", first_purchase_date) < DATE_TRUNC("month", MAKE_DATE(year, month, 1)) THEN customer_id END) AS returning_customers FROM customer_months GROUP BY year, month) SELECT year, month, total_customers, returning_customers, ROUND(returning_customers * 100.0 / total_customers, 2) AS returning_percent FROM monthly_stats ORDER BY year, month;'
// }, {
//   id: 83,
//   title: 'Top Customers',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'RANK', 'GROUP BY'],
//   description: 'Identify the highest spending customer (i.e., customer with the highest total sales) for each year. Output year, customer_name, total_spending, sorted by year ascending.',
//   completed: false,
//   solution: 'WITH yearly_customer_sales AS (SELECT EXTRACT(YEAR FROM order_date) AS year, customer_name, SUM(sales) AS total_spending, RANK() OVER (PARTITION BY EXTRACT(YEAR FROM order_date) ORDER BY SUM(sales) DESC) AS spending_rank FROM orders GROUP BY year, customer_name) SELECT year, customer_name, total_spending FROM yearly_customer_sales WHERE spending_rank = 1 ORDER BY year;'
// }, {
//   id: 84,
//   title: 'Power of Cube',
//   difficulty: 'Hard',
//   tags: ['CUBE', 'GROUPING SETS', 'Aggregation'],
//   description: 'Show total sales and profit, broken down by every combination of Region, Product Category, and Customer Segment. Include all subtotals: by Region only, by Category only, by Segment only, combinations of two, and the grand total as well. Hint: Use CUBE.',
//   completed: false,
//   solution: 'SELECT COALESCE(region, "All Regions") AS region, COALESCE(category, "All Categories") AS category, COALESCE(segment, "All Segments") AS segment, SUM(sales) AS total_sales, SUM(profit) AS total_profit FROM orders GROUP BY CUBE(region, category, segment) ORDER BY region, category, segment;'
// }, {
//   id: 85,
//   title: 'Rolling Challenge',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'Rolling Average', 'Date Functions'],
//   description: 'Calculate the rolling 6-month profit by product category. Output category, order_year, order_month, profit, and rolling_6mo_profit.',
//   completed: false,
//   solution: 'WITH monthly_category_profit AS (SELECT category, EXTRACT(YEAR FROM order_date) AS order_year, EXTRACT(MONTH FROM order_date) AS order_month, SUM(profit) AS profit FROM orders GROUP BY category, order_year, order_month) SELECT category, order_year, order_month, profit, SUM(profit) OVER (PARTITION BY category ORDER BY order_year, order_month ROWS BETWEEN 5 PRECEDING AND CURRENT ROW) AS rolling_6mo_profit FROM monthly_category_profit ORDER BY category, order_year, order_month;'
// }, {
//   id: 86,
//   title: 'Average Time Between Orders',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'LAG', 'Date Functions'],
//   description: "Find the average gap (in days) between customer orders (i.e., average time between a customer's 1st → 2nd order, 2nd → 3rd order, etc.).",
//   completed: false,
//   solution: 'WITH customer_orders AS (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_num FROM orders GROUP BY customer_id, order_date), order_gaps AS (SELECT customer_id, order_date, LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_order_date, order_num FROM customer_orders) SELECT AVG(DATEDIFF(order_date, prev_order_date)) AS avg_days_between_orders FROM order_gaps WHERE prev_order_date IS NOT NULL;'
// }, {
//   id: 87,
//   title: 'Currency Exchange Rates',
//   difficulty: 'Hard',
//   tags: ['CASE', 'Calculated Fields', 'Date Functions'],
//   description: 'Based on a distribution agreement, a European partner receives 5% of all Copier (subcategory) sales, paid in Euros. Calculate the total commission to be paid each year from 2015 to 2018. The commission must be converted from USD to EUR using the following annual exchange rates: 2015: 0.90, 2016: 0.91, 2017: 0.88, and 2018: 0.85. Output year and eur_commission, sorted by year.',
//   completed: false,
//   solution: 'WITH yearly_copier_sales AS (SELECT EXTRACT(YEAR FROM order_date) AS year, SUM(sales) * 0.05 AS usd_commission FROM orders WHERE sub_category = "Copiers" AND EXTRACT(YEAR FROM order_date) BETWEEN 2015 AND 2018 GROUP BY year) SELECT year, ROUND(usd_commission * CASE WHEN year = 2015 THEN 0.90 WHEN year = 2016 THEN 0.91 WHEN year = 2017 THEN 0.88 ELSE 0.85 END, 2) AS eur_commission FROM yearly_copier_sales ORDER BY year;'
// }, {
//   id: 88,
//   title: '2nd Purchase Within 90 Days',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'Date Functions', 'Percentage'],
//   description: 'Among customers with at least two purchases, what percentage made their second purchase within 90 days of the first?',
//   completed: false,
//   solution: 'WITH customer_purchases AS (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS purchase_num FROM orders GROUP BY customer_id, order_date), first_second_purchase AS (SELECT c1.customer_id, c1.order_date AS first_purchase, c2.order_date AS second_purchase FROM customer_purchases c1 JOIN customer_purchases c2 ON c1.customer_id = c2.customer_id AND c1.purchase_num = 1 AND c2.purchase_num = 2) SELECT ROUND(COUNT(CASE WHEN DATEDIFF(second_purchase, first_purchase) <= 90 THEN 1 END) * 100.0 / COUNT(*), 2) AS percentage_within_90_days FROM first_second_purchase;'
// }, {
//   id: 89,
//   title: 'Binders vs Paper',
//   difficulty: 'Hard',
//   tags: ['CASE', 'Date Functions', 'GROUP BY'],
//   description: 'For each day in September 2017, return the quantity of Binders and Paper sold and their difference. Output day, binder_sales, paper_sales, and difference.',
//   completed: false,
//   solution: 'WITH daily_sales AS (SELECT order_date, SUM(CASE WHEN sub_category = "Binders" THEN quantity ELSE 0 END) AS binder_sales, SUM(CASE WHEN sub_category = "Paper" THEN quantity ELSE 0 END) AS paper_sales FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2017 AND EXTRACT(MONTH FROM order_date) = 9 GROUP BY order_date) SELECT order_date AS day, binder_sales, paper_sales, ABS(binder_sales - paper_sales) AS difference FROM daily_sales ORDER BY day;'
// }, {
//   id: 90,
//   title: 'Tenfold',
//   difficulty: 'Hard',
//   tags: ['Window Functions', 'LAG', 'Date Functions'],
//   description: 'Return all days where sales were at least ten times higher than the previous day. Output order_date, total_sales, and previous_day_sales.',
//   completed: false,
//   solution: 'WITH daily_sales AS (SELECT order_date, SUM(sales) AS total_sales FROM orders GROUP BY order_date ORDER BY order_date), sales_comparison AS (SELECT order_date, total_sales, LAG(total_sales) OVER (ORDER BY order_date) AS previous_day_sales FROM daily_sales) SELECT order_date, total_sales, previous_day_sales FROM sales_comparison WHERE total_sales >= previous_day_sales * 10 AND previous_day_sales > 0;'
// }];
