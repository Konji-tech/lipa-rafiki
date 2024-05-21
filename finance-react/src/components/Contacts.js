import { getContacts } from "../utils/finance";

export function Contacts() {
	const contacts = getContacts();

	return (
		<div className="px-4">
			<div className="overflow-hidden rounded-xl border-2 border-black bg-primary">
				<table className="w-full">
					<thead className="border-b-2 border-black text-white">
						<tr>
							<th className="px-4 py-2 text-left">First Name</th>
							<th className="px-4 py-2 text-left">Last Name</th>
							<th className="px-4 py-2 text-left"> Phone Number </th>
							<th className="px-4 py-2 text-right"> Currency </th>
						</tr>
					</thead>

					<tbody className="bg-light-bg">
						{contacts.map((e, index) => {
							return (
								<tr className="border-b-2 border-black/10 last:border-b-0" key={index}>
									<td className="px-4 py-2">{e.firstName}</td>
									<td className="px-4 py-2">{e.lastName}</td>
									<td className="px-4 py-2">{e.phoneNumber}</td>
									<td className="px-4 py-2 text-right">{e.currency}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
