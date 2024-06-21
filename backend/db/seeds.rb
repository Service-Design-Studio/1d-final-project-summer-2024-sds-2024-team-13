User.destroy_all
Transaction.destroy_all

User.create([
  {
    userID: 1,
    userName: 'john_doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    createdAt: DateTime.now
  },
  {
    userID: 2,
    userName: 'jane_smith',
    email: 'jane.smith@example.com',
    phone: '098-765-4321',
    createdAt: DateTime.now
  },
  {
    userID: 3,
    userName: 'alice_jones',
    email: 'alice.jones@example.com',
    phone: '555-123-4567',
    createdAt: DateTime.now
  }
])


Transaction.create([
  {
    transactionID: 1,
    transactionSum: 9.50,
    userID: 1,
    amount: 9.50,
    timestamp: DateTime.now,
    paymentMethod: "PayNow"
  },
  {
    transactionID: 2,
    transactionSum: 8.75,
    userID: 2,
    amount: 8.75,
    timestamp: DateTime.now,
    paymentMethod: "PayLah"
  },
  {
    transactionID: 3,
    transactionSum: 7.00,
    userID: 3,
    amount: 7.00,
    timestamp: DateTime.now,
    paymentMethod: "Credit Card"
  },
  {
    transactionID: 4,
    transactionSum: 6.50,
    userID: 1,
    amount: 6.50,
    timestamp: DateTime.now,
    paymentMethod: "Credit Card"
  },
  {
    transactionID: 5,
    transactionSum: 5.25,
    userID: 2,
    amount: 5.25,
    timestamp: DateTime.now,
    paymentMethod: "PayNow"
  },
  {
    transactionID: 6,
    transactionSum: 4.50,
    userID: 3,
    amount: 4.50,
    timestamp: DateTime.now,
    paymentMethod: "PayLah"
  },
  {
    transactionID: 7,
    transactionSum: 3.75,
    userID: 1,
    amount: 3.75,
    timestamp: DateTime.now,
    paymentMethod: "Credit Card"
  },
  {
    transactionID: 8,
    transactionSum: 6.25,
    userID: 2,
    amount: 6.25,
    timestamp: DateTime.now,
    paymentMethod: "PayNow"
  },
  {
    transactionID: 9,
    transactionSum: 7.00,
    userID: 3,
    amount: 7.00,
    timestamp: DateTime.now,
    paymentMethod: "PayLah"
  },
  {
    transactionID: 10,
    transactionSum: 8.50,
    userID: 1,
    amount: 8.50,
    timestamp: DateTime.now,
    paymentMethod: "Credit Card"
  },
  {
    transactionID: 11,
    transactionSum: 5.75,
    userID: 2,
    amount: 5.75,
    timestamp: DateTime.now,
    paymentMethod: "PayNow"
  },
  {
    transactionID: 12,
    transactionSum: 4.25,
    userID: 3,
    amount: 4.25,
    timestamp: DateTime.now,
    paymentMethod: "Credit Card"
  },
  {
    transactionID: 13,
    transactionSum: 6.00,
    userID: 1,
    amount: 6.00,
    timestamp: DateTime.now,
    paymentMethod: "PayLah"
  }
])
