import { queryKeys } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";

function ExchangePage() {
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });

	// function to render the exchange rate table
	const renderExchangeRateTable = () => {
		const { rates } = exchangeQuery.data;

		return (
			<table>
				<thead>
					<tr>
						<th>Currency</th>
						<th>Exchange Rate</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(rates).map(([currency, rate]) => (
						<tr key={currency}>
							<td>{currency}</td>
							<td>{rate}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return <div className="p-4">{renderExchangeRateTable()}</div>;
}

export default ExchangePage;
