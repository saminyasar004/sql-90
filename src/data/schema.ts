export const schema = {
  tables: [{
    name: 'orders',
    description: 'Line-level orders with customer, product, location, shipping, and financials',
    columns: [{
      name: 'row_id',
      type: 'VARCHAR(20) PRIMARY KEY'
    }, {
      name: 'order_id',
      type: 'VARCHAR(25)'
    }, {
      name: 'order_date',
      type: 'DATE'
    }, {
      name: 'ship_date',
      type: 'DATE'
    }, {
      name: 'ship_mode',
      type: 'VARCHAR(20)'
    }, {
      name: 'customer_id',
      type: 'VARCHAR(20) REFERENCES customers(customer_id)'
    }, {
      name: 'postal_code',
      type: 'VARCHAR(20) REFERENCES locations(postal_code)'
    }, {
      name: 'product_id',
      type: 'VARCHAR(25) REFERENCES products(product_id)'
    }, {
      name: 'sales',
      type: 'DECIMAL(10,2)'
    }, {
      name: 'quantity',
      type: 'INTEGER'
    }, {
      name: 'discount',
      type: 'DECIMAL(5,2)'
    }, {
      name: 'profit',
      type: 'DECIMAL(10,2)'
    }]
  }, {
    name: 'returns',
    description: 'Return status by order',
    columns: [{
      name: 'order_id',
      type: 'VARCHAR(25) PRIMARY KEY REFERENCES orders(order_id)'
    }, {
      name: 'returned',
      type: 'VARCHAR(10)'
    } // e.g., 'Yes'/'No'
    ]
  }, {
    name: 'customers',
    description: 'Customer master data',
    columns: [{
      name: 'customer_id',
      type: 'VARCHAR(20) PRIMARY KEY'
    }, {
      name: 'customer_name',
      type: 'VARCHAR(100)'
    }, {
      name: 'segment',
      type: 'VARCHAR(50)'
    }]
  }, {
    name: 'locations',
    description: 'Geographic details keyed by postal code',
    columns: [{
      name: 'postal_code',
      type: 'VARCHAR(20) PRIMARY KEY'
    }, {
      name: 'city',
      type: 'VARCHAR(50)'
    }, {
      name: 'state',
      type: 'VARCHAR(50)'
    }, {
      name: 'region',
      type: 'VARCHAR(50)'
    }, {
      name: 'country',
      type: 'VARCHAR(50)'
    }]
  }, {
    name: 'products',
    description: 'Product catalog with category hierarchy',
    columns: [{
      name: 'product_id',
      type: 'VARCHAR(25) PRIMARY KEY'
    }, {
      name: 'product_name',
      type: 'VARCHAR(150)'
    }, {
      name: 'category',
      type: 'VARCHAR(50)'
    }, {
      name: 'sub_category',
      type: 'VARCHAR(50)'
    }]
  }]
};