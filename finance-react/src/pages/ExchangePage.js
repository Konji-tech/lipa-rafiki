// Showcasing exchange rate table

import { queryKeys } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";

function ExchangePage() {
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });

	return (
		<div className="px-8 py-4">
			<div className="overflow-hidden rounded-xl border-2 border-black bg-primary">
				<table className="w-full">
					<thead className="border-b-2 border-black text-white">
						<tr>
							<th className="px-4 py-2 text-left">Currency</th>
							<th className="px-4 py-2 text-left">Exchange Rate</th>
						</tr>
					</thead>
					{exchangeQuery.data?.rates ? (
						<tbody className="bg-light-bg">
							{Object.entries(exchangeQuery.data?.rates).map(([currency, rate]) => (
								<tr key={currency}>
									<td className="px-4 py-2">{currency}</td>
									<td className="px-4 py-2">{rate}</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td colSpan="2">Data not loaded</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}

export default ExchangePage;
