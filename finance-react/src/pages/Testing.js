import { queryKeys } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Contact } from "../utils/finance";

function TestPage() {
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });
	const contactsQuery = useQuery({ queryKey: queryKeys.contacts });

	return (
		<div className="grid gap-16 p-4">
			<div class="border-2 border-black bg-white/50 p-4">
				<h1 class="text-4xl font-black">Contacts</h1>

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

				<pre>{JSON.stringify(contactsQuery.data, null, 2)}</pre>
			</div>

			<h1 class="text-4xl font-black">Exchange Rates</h1>

			<pre> {JSON.stringify(exchangeQuery.data, null, 2)}</pre>
		</div>
	);
}

export default TestPage;
