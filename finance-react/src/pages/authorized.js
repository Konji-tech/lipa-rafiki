import { queryKeys } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Contact } from "../utils/finance";

function Authorized() {
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });
	const contactsQuery = useQuery({ queryKey: queryKeys.contacts });
	return (
		<div className="grid gap-16 p-4">
			<div class="border-2 border-black bg-white/50 p-4">
				<h1 class="text-4xl font-black">Contact Balances</h1>
				<div class="grid gap-4">
					{contactsQuery.data.map((e) => {
						const contact = new Contact(e?.phoneNumber, e?.firstName, e?.lastName, e?.currency);

						return (
							<div class="border-2 border-black bg-white p-4">
								<h4 class="text-lg">
									{contact.firstName} {contact.lastName}
								</h4>
								<p class="text-lg">{contact.balance}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Authorized;
