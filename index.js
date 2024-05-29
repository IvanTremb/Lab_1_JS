// const jsonFilePath = "transaction.json";
// class TransactionAnalyzer {
//     constructor(transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type ){
//         this.transaction_id = transaction_id;
//         this.transaction_date = transaction_date;
//         this.transaction_amount = transaction_amount;
//         this.transaction_type = transaction_type;
//         this.transaction_description = transaction_description;
//         this.merchant_name = merchant_name;
//         this.card_type = card_type;
//     }

// }
let fs = require('fs');

class TransactionAnalyzer {
  constructor(transactions) {
    this.transactions = transactions;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  getAllTransaction() {
    return this.transactions;
  }

  saveToFile(filepath) {
    let json = JSON.stringify(this.transactions, null, 2);
    fs.writeFileSync(filepath, json, 'utf8');
  }

  calculateTotalAmount() {
    return this.transactions.reduce((total, transaction) => {
      let amount = parseFloat(transaction.transaction_amount);
      return total + amount;
    }, 0);
  }
  calculateTotalAmountByDate(year, month, day) {
    return this.transactions.reduce((total, transaction) => {
      let transactionDate = new Date(transaction.transaction_date);
      if (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month - 1 &&
        transactionDate.getDate() === day
      ) {
        let amount = parseFloat(transaction.transaction_amount)
          total += amount;
      }
      return total;
    }, 0);
  }
  getTransactionByType(type) {
    return this.transactions.filter(transaction => {
      return transaction.transaction_type === type;
    });
  }
}

function readJsonFileSync(filepath, encoding = 'utf8') {
  let file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

let jsonFilePath = 'transaction.json';

let transactions = readJsonFileSync(jsonFilePath);

let transactionAnalyzer = new TransactionAnalyzer(transactions);

let newTransaction = {
  "transaction_id": "51",
  "transaction_date": "2024-05-28",
  "transaction_amount": 50.00,
  "transaction_type": "credit",
  "transaction_description": "Refund for returned item",
  "merchant_name": "SuperMart",
  "card_type": "MasterCard"
};

transactionAnalyzer.addTransaction(newTransaction);

transactionAnalyzer.saveToFile(jsonFilePath);

let allTransactions = transactionAnalyzer.getAllTransaction();
console.log(allTransactions);

let totalAmount = transactionAnalyzer.calculateTotalAmount();
console.log("Сумма всех транзакций= " + totalAmount)

let dateOfTransaction = transactionAnalyzer.calculateTotalAmountByDate(2019,1,31)
console.log("Сумма всех транзакций за эту дату составляют " + dateOfTransaction)

let typeOfTransaction = transactionAnalyzer.getTransactionByType("credit")
console.log(typeOfTransaction)