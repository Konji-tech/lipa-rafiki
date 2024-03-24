// create contacts

import { userPhoneNumber } from "./cache";
import { Contact } from "./finance";

export function initState() {
  new Contact(userPhoneNumber, "Andrew", "Kibet").save();
}
