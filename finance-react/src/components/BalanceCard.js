import { getCurrentUserContact } from "../utils/cache";

export function BalanceCard() {
	const user = getCurrentUserContact();

	return (
		<div className="mr-auto flex w-full max-w-96 flex-col gap-3 rounded-xl border-2 border-black bg-blue-200 p-4 py-6 text-black shadow-lg shadow-blue-300">
			<p className="text-md font-bold">Balance</p>
			<p className="text-4xl font-light">
				KES {user?.balance?.toLocaleString()}
			</p>
		</div>
	);
}
