import { queryKeys } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Contact } from "../utils/finance";

function AuthorizedPage() {
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });
	const contactsQuery = useQuery({ queryKey: queryKeys.contacts });

	function getForeignAmount(rates, contact) {
		return contact.balance * rates[contact.currency];
	}

	return (
		<div className="grid gap-16 p-4">
			<div className="border-2 border-black bg-white/50 p-4">
				<h1 className="text-4xl font-black">Contact Balances</h1>
				<div className="grid gap-4">
					{contactsQuery.data?.map((e) => {
						const contact = new Contact(e?.phoneNumber, e?.firstName, e?.lastName, e?.currency);

						return (
							<div className="border-2 border-black bg-white p-4" key={contact.phoneNumber}>
								<h4 className="text-lg">
									{contact.firstName} {contact.lastName}
								</h4>
								<p className="text-lg">KES {contact.balance}</p>
								<p className="text-lg">
									{exchangeQuery.data &&
										// if rates have loaded, get this contact's converted balance
										getForeignAmount(exchangeQuery.data.rates, contact).toLocaleString("en-US", {
											style: "currency",
											currency: contact.currency,
										})}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default AuthorizedPage;
