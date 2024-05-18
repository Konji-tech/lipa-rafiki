import { Contact } from "./finance";

// to cache the data used for calculating
export function setCache(key, value) {
	localStorage.setItem(`finance-${key}`, JSON.stringify(value));
}

export function getCache(key) {
	return JSON.parse(localStorage.getItem(`finance-${key}`) || "[]");
}

//To diff Andrew's number
export const userPhoneNumber = "+254711223344";

// getters

export function getContacts() {
	// get everyone except Andrew
	return (getCache("contacts") ?? [])?.filter((e) => e.phoneNumber !== "+254711223344");
}

export function getCurrentUserContact() {
	const user = (getCache("contacts") ?? []).find((e) => e.phoneNumber === userPhoneNumber);

	if (user) {
		return new Contact(user.phoneNumber, user.firstName, user.lastName);
	}
}

export function getTransfers() {
	return getCache("transfers") ?? [];
}

export function getDeposits() {
	return getCache("deposits") ?? [];
}

export function getWithdrawals() {
	return getCache("withdrawals") ?? [];
}

/*export function getGroups() {
	return getCache("groups") ?? [];
}*/
