// [x] transaction system
// [x] transfer funds between accounts

import { queryKeys } from "./constants";
import database from "./database";
import { queryClient } from "./network";

//helper functions

export function getTotalAmount(accumulator, element) {
	return accumulator + element.amount;
}

export function getTotalAmountWithTransactionCost(accumulator, element) {
	return accumulator + element?.amount + (element?.transactionCost || 0);
}

export function getNameByPhoneNumber(phone) {
	const c = new CacheWrapper().cachedContacts?.find((e) => e.phoneNumber === phone);
	return c?.firstName + " " + c?.lastName;
}

export function getTransactionCostForAmount(amount) {
	if (amount <= 1000) return 10;
	else if (amount <= 10000) return 15;
	else if (amount <= 100000) return 20;
	else return 25;
}

export const userPhoneNumber = "+254711223344";

export function getContacts() {
	const data = new CacheWrapper().cachedContacts?.filter((e) => e.phoneNumber !== userPhoneNumber);
	return data;
}

export function getCurrentUserContact() {
	const c = new CacheWrapper().cachedContacts?.find((e) => e?.phoneNumber === userPhoneNumber);
	return new Contact(c?.phoneNumber, c?.firstName, c?.lastName, c?.currency);
}

export function getUserBalance(deposits, transactions, withdrawals) {
	return getCurrentUserContact()?.balance ?? 0;
}

class CacheWrapper {
	get cachedContacts() {
		return (queryClient.getQueryData(queryKeys.contacts) || [])?.map(
			(e) => new Contact(e?.phoneNumber, e?.firstName, e?.lastName, e?.currency),
		);
	}
	get cachedDeposits() {
		return queryClient.getQueryData(queryKeys.deposits) || [];
	}
	get cachedWithdrawals() {
		return queryClient.getQueryData(queryKeys.withdrawals) || [];
	}
	get cachedTransfers() {
		return queryClient.getQueryData(queryKeys.transfers) || [];
	}
}

//Classes : contact,transfer,group

export class Contact extends CacheWrapper {
	phoneNumber;
	firstName;
	lastName;
	currency;

	constructor(phone, fname, lname, currency) {
		super();
		this.phoneNumber = phone;
		this.firstName = fname;
		this.lastName = lname;
		this.currency = currency;
	}

	save() {
		if (!this.cachedContacts.find((e) => e.phoneNumber === this.phoneNumber)) {
			database.saveContact(this);
		}
	}

	get deposits() {
		return this.cachedDeposits.filter((e) => e.phoneNumber === this.phoneNumber);
	}
	get totalDeposited() {
		return this.deposits.reduce(getTotalAmount, 0);
	}
	get withdrawals() {
		return this.cachedWithdrawals.filter((e) => e.phoneNumber === this.phoneNumber);
	}
	get totalWithdrawn() {
		return this.withdrawals.reduce(getTotalAmount, 0);
	}
	get totalWithdrawnWithTransactionCosts() {
		return this.withdrawals.reduce(getTotalAmountWithTransactionCost, 0);
	}
	// receiving === crediting my acc
	get creditTransactions() {
		return this.cachedTransfers.filter((e) => e.receiver === this.phoneNumber);
	}
	get totalReceived() {
		return this.creditTransactions.reduce(getTotalAmount, 0);
	}
	get debitTransactions() {
		return this.cachedTransfers.filter((e) => e.sender === this.phoneNumber);
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

export class Transfer extends CacheWrapper {
	sender;
	receiver;
	amount;
	transactionCost;
	date;

	constructor(sender, receiver, amount) {
		super();
		this.sender = sender;
		this.receiver = receiver;
		this.amount = amount;
		this.date = new Date();
		this.transactionCost = getTransactionCostForAmount(amount);
	}

	// Firebase response
	async save() {
		await database.saveTransfer(this);
	}
}

export class Deposit extends CacheWrapper {
	date;
	phoneNumber;
	amount;
	constructor(phone, amount) {
		super();
		this.phoneNumber = phone;
		this.amount = amount;
		this.date = new Date();
	}
	async save() {
		await database.saveDeposit(this);
	}
}

export class Withdrawal extends Deposit {
	get transactionCost() {
		return getTransactionCostForAmount(this.amount);
	}
	async save() {
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
