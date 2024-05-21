import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { db } from "./firebase";

function toObj(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function setValue(collectionName) {
	return async function (data) {
		await setDoc(doc(db, collectionName, uuid().toString()), toObj(data));
	};
}

function getValues(collectionName) {
	return async function () {
		const querySnapshot = await getDocs(collection(db, collectionName));
		let arr = [];
		querySnapshot.forEach((doc) => arr.push(doc.data()));
		return arr;
	};
}

export default {
	// setters
	saveTransfer: setValue("transfers"),
	saveDeposit: setValue("deposits"),
	saveWithdrawals: setValue("withdrawls"),
	saveGroup: setValue("groups"),
	saveContact: setValue("contacts"),

	// getters
	getTransfers: getValues("transfers"),
	getDeposits: getValues("deposits"),
	getWithdrawals: getValues("withdrawls"),
	getGroups: getValues("groups"),
	getContacts: getValues("contacts"),
};
