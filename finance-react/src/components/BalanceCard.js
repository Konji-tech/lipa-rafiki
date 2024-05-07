import { queryKeys } from "../utils/constants";
import { getUserBalance } from "../utils/finance";
import { useQuery } from "@tanstack/react-query";

export function BalanceCard() {
	const [withdrawalsQuery, depositsQuery, transfersQuery] = [
		useQuery({ queryKey: queryKeys.withdrawals }),
		useQuery({ queryKey: queryKeys.deposits }),
		useQuery({ queryKey: queryKeys.transfers }),
	];

	return (
		<div className="mr-auto flex w-full max-w-96 flex-col gap-3 rounded-xl border-2 border-black bg-blue-200 p-4 py-6 text-black shadow-lg shadow-blue-300">
			<p className="text-md font-bold">Balance</p>
			<p className="text-4xl font-light">
				{getUserBalance(
					depositsQuery.data,
					transfersQuery.data,
					withdrawalsQuery.data,
				).toLocaleString("en-US", {
					style: "currency",
					currency: "KES",
				})}
			</p>
		</div>
	);
}
