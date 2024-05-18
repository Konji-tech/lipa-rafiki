// create contacts

import { setCache, userPhoneNumber } from "./cache";
import { Contact } from "./finance";

export function initState() {
	new Contact(userPhoneNumber, "Andrew", "Jeremy", "KES").save();

	// dummy contacts
	new Contact("+254700000001", "Viola", "Konji", "KES").save();
	new Contact("+254700000002", "Mercy", "Anne", "USD").save();
	new Contact("+254700000003", "James", "Charles", "NGN").save();
	new Contact("+254700000005", "Anne", "Marie", "UGX").save();
	new Contact("+254700000006", "Dru", "Sim", "YER").save();
	new Contact("+254700000007", "Naske", "LIme", "SDG").save();
	new Contact("+254700000008", "Jamie", "Son", "VND").save();
}
