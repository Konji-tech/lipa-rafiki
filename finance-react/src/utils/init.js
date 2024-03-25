// create contacts

import { userPhoneNumber } from "./cache";
import { Contact } from "./finance";

export function initState() {
  new Contact(userPhoneNumber, "Andrew", "Kibet").save();

  // dummy contacts
  new Contact("+254700000001", "Viola", "Konji").save();
  new Contact("+254700000002", "Mercy", "Anne").save();
  new Contact("+254700000003", "James", "Charles").save();
  new Contact("+254700000004", "Tony", "Stark").save();
}
