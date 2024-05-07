// create contacts

import { setCache, userPhoneNumber } from "./cache";
import { Contact } from "./finance";

export function initState() {
	new Contact(userPhoneNumber, "Andrew", "Kibet", "KES").save();

	// dummy contacts
	new Contact("+254700000001", "Viola", "Konji", "KES").save();
	new Contact("+254700000002", "Mercy", "Anne", "USD").save();
	new Contact("+254700000003", "James", "Charles", "NGN").save();
	new Contact("+254700000004", "Tony", "Stark", "INR").save();
}
