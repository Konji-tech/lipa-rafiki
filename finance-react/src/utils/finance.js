// [x] transaction system
// [x] transfer funds between accounts
// [x] display reports

import * as cache from "./cache";

//custom feature:
// [x] create groups
// [x] Bundle group payment

//act as database
const contacts = cache.getContacts();
const deposits = cache.getDeposits();
const withdrawals = cache.getWithdrawals();
const transfers = cache.getTransfers();

//helper functions
export function getTotalAmount(accumulator, element) {
  return accumulator + element.amount;
}

export function getTotalAmountWithTransactionCost(accumulator, element) {
  return accumulator + element.amount + element.transactionCost;
}

export function getNameByPhoneNumber(phone) {
  const c = contacts.find((e) => e.phoneNumber === phone);
  return c.firstName + " " + c.lastName;
}

export function getTransactionCostForAmount(amount) {
  if (amount <= 1000) return 10;
  else if (amount <= 10000) return 15;
  else if (amount <= 100000) return 20;
}
//Classes : contact,transfer,group

export class Contact {
  phoneNumber;
  firstName;
  lastName;

  constructor(phone, fname, lname) {
    this.phoneNumber = phone;
    this.firstName = fname;
    this.lastName = lname;

    this.save();
  }

  save() {
    contacts.push(this);
    cache.setCache("contacts", contacts);
  }

  get deposits() {
    return deposits.filter((e) => e.phoneNumber === this.phoneNumber);
  }
  get totalDeposited() {
    return this.deposits.reduce(getTotalAmount, 0);
  }
  get withdrawals() {
    return withdrawals.filter((e) => e.phoneNumber === this.phoneNumber);
  }
  get totalWithdrawn() {
    return this.withdrawals.reduce(getTotalAmount, 0);
  }
  get totalWithdrawnWithTransactionCosts() {
    return this.withdrawals.reduce(getTotalAmountWithTransactionCost, 0);
  }
  // receiving === crediting my acc
  get creditTransactions() {
    return transfers.filter((e) => e.receiver === this.phoneNumber);
  }
  get totalReceived() {
    return this.creditTransactions.reduce(getTotalAmount, 0);
  }
  get debitTransactions() {
    return transfers.filter((e) => e.sender === this.phoneNumber);
  }
  get totalSent() {
    return this.debitTransactions.reduce(getTotalAmount, 0);
  }
  get totalSentWithTransactionCosts() {
    return this.debitTransactions.reduce(getTotalAmountWithTransactionCost, 0);
  }

  get balance() {
    const Balance =
      this.totalDeposited +
      this.totalReceived -
      (this.totalWithdrawnWithTransactionCosts +
        this.totalSentWithTransactionCosts);
    return Balance;
  }

  // print report
  printStatement() {
    console.log(` ${this.firstName} ${this.lastName}
---- Statement: --------------------------------------------------------
	Total Deposits		: ${this.deposits.length}
	Amount Deposited	: KSH ${this.totalDeposited}
	Total Withdrawals	: ${this.withdrawals.length}	
	Amount Withdrawn	: KSH ${this.totalWithdrawn}
	----------------------------------------------------------------
	Total Amount Sent	:  KSH ${this.totalSent} in ${this.debitTransactions.length} transactions
	Total Amount Received 	:  KSH ${this.totalReceived} in ${this.creditTransactions.length} transactions
	----------------------------------------------------------------
	Balance				: KSH ${this.balance}
------------------------------------------------------------------------
`);
  }

  printTransactionHistory() {
    console.log(
      "---- History: ----------------------------------------------------------",
    );
    console.log(`${this.firstName} sent a total of KSH ${this.totalSent}`);
    const debitHistory = this.debitTransactions.map((e) => {
      return {
        "Sent to": getNameByPhoneNumber(e.receiver),
        "Amount (KSH)": e.amount,
        "Transaction cost (KSH)": e.transactionCost,
      };
    });
    console.table(debitHistory);
    console.log(`and received a total of KES ${this.totalReceived}`);
    const creditHistory = this.creditTransactions.map((e) => {
      return {
        "Received from ": getNameByPhoneNumber(e.sender),
        "Amount (KSH)": e.amount,
      };
    });
    console.table(creditHistory);
    console.log(
      "------------------------------------------------------------------------",
    );
  }
}

export class Transfer {
  sender;
  receiver;
  amount;
  transactionCost;

  constructor(sender, receiver, amount) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.transactionCost = getTransactionCostForAmount(amount);

    const senderName = getNameByPhoneNumber(sender);
    const receiverName = getNameByPhoneNumber(receiver);

    console.log(
      `${senderName} has sent KSH ${amount} to ${receiverName} Transaction Cost : KSH ${this.transactionCost}`,
    );

    this.save();
  }

  save() {
    transfers.push(this);
    cache.setCache("transfers", transfers);
  }
}

export class Deposit {
  date;
  phoneNumber;
  amount;
  constructor(phone, amount) {
    this.phoneNumber = phone;
    this.amount = amount;
    this.date = new Date();
    this.save();
  }
  save() {
    deposits.push(this);
    cache.setCache("deposits", deposits);
  }
}

export class Withdrawal extends Deposit {
  get transactionCost() {
    return getTransactionCostForAmount(this.amount);
  }
  save() {
    withdrawals.push(this);
    cache.setCache("withdrawals", withdrawals);
  }
}

export class Group {
  name;
  members = []; // array of phone numbers

  constructor(str) {
    this.name = str;
  }

  addMembers(...arr) {
    this.members.push(...arr);
  }
  removeMembers(...arr) {
    // get all phone numbers, where e (phone number) is not included in the array we pass
    this.members = this.members.filter((e) => !arr.includes(e));
    arr.forEach((phone) => {
      const memberName = getNameByPhoneNumber(phone);
      console.log(`Removed ${memberName} from Group : ${this.name}`);
    });
  }

  makeBulkPayments(sender, amount) {
    for (let i = 0; i < this.members.length; i++) {
      const receiver = this.members[i];
      if (sender !== receiver) new Transfer(sender, receiver, amount);
    }
  }
}