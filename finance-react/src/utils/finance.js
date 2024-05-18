// [x] transaction system
// [x] transfer funds between accounts

import * as cache from "./cache";
import database from "./database";

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
	return c?.firstName + " " + c?.lastName;
}

export function getTransactionCostForAmount(amount) {
	if (amount <= 1000) return 10;
	else if (amount <= 10000) return 15;
	else if (amount <= 100000) return 20;
	else return 25;
}

export function getUserBalance(deposits, transactions, withdrawals) {
	return cache.getCurrentUserContact()?.balance;
}

//Classes : contact,transfer,group

export class Contact {
	phoneNumber;
	firstName;
	lastName;
	currency;

	constructor(phone, fname, lname, currency) {
		this.phoneNumber = phone;
		this.firstName = fname;
		this.lastName = lname;
		this.currency = currency;
	}

	save() {
		if (!contacts.find((e) => e.phoneNumber === this.phoneNumber)) {
			contacts.push(this);
			cache.setCache("contacts", contacts);
			database.saveContact(this);
		}
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
			this.totalDeposited + this.totalReceived - (this.totalWithdrawnWithTransactionCosts + this.totalSentWithTransactionCosts);
		return Balance;
	}
}

export class Transfer {
	sender;
	receiver;
	amount;
	transactionCost;
	date;

	constructor(sender, receiver, amount) {
		this.sender = sender;
		this.receiver = receiver;
		this.amount = amount;
		this.date = new Date();
		this.transactionCost = getTransactionCostForAmount(amount);
	}

	// Firebase response
	async save() {
		transfers.push(this);
		await database.saveTransfer(this);
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
	}
	async save() {
		deposits.push(this);
		await database.saveDeposit(this);
	}
}

export class Withdrawal extends Deposit {
	get transactionCost() {
		return getTransactionCostForAmount(this.amount);
	}
	async save() {
		withdrawals.push(this);
		await database.saveWithdrawals(this);
	}
}

/*export class Group {
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
}*/
