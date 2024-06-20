Transaction.delete_all

Transaction.create([
  {
    transactionID: 1,
    transactionSum: 200.50,
    userID: 101,
    amount: 150.00,
    timestamp: DateTime.now,
    paymentMethod: "PayNow"
  },
  {
    transactionID: 2,
    transactionSum: 450.75,
    userID: 102,
    amount: 300.25,
    timestamp: DateTime.now,
    paymentMethod: "PayLah"
  },
  {
    transactionID: 3,
    transactionSum: 120.00,
    userID: 103,
    amount: 120.00,
    timestamp: DateTime.now,
    paymentMethod: "Credit Card"
  }
])