import { useState } from "react";
import { BalanceCard } from "../components/BalanceCard";
import Button from "../components/custom/Button";
import { getCurrentUserContact, userPhoneNumber } from "../utils/finance";

import { Withdrawal } from "../utils/finance";
import { formatDate, formatRelativeTime } from "../utils/strings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; //notification

import { queryKeys } from "../utils/constants";

export default function WithdrawPage() {
	const user = getCurrentUserContact();

	const withdrawalsQuery = useQuery({ queryKey: queryKeys.withdrawals });
	const queryClient = useQueryClient();

	const [withdrawAmount, setAmount] = useState(0);

	async function init() {
		queryClient.invalidateQueries(queryKeys.withdrawals);
	}

	// form state
	async function handleSubmission(e) {
		// prevent page from reloading
		e.preventDefault();

		// validate available amount

		if (withdrawAmount <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}

		if (withdrawAmount > user.balance) {
			toast.error("Your balance is insufficient");
			return;
		}

		const transcation = new Withdrawal(userPhoneNumber, parseFloat(withdrawAmount));
		await transcation.save();

		// update page data
		setAmount(0);
		await init();

		//notification
		const myPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ name: "Success" });
			}, 500);
		});

		toast.promise(myPromise, {
			loading: "Withdrawing...",
			success: `  ${withdrawAmount} has been Withdrawn`,
			error: "Error Occurred",
		});
	}

	return (
		<div className="flex flex-col gap-8 px-4 py-8">
			<BalanceCard />
			<form onSubmit={handleSubmission} className="grid gap-4 rounded-xl border-2 border-black bg-light-bg p-4">
				<h1 className="font-mono text-xl font-bold uppercase">Withdraw money</h1>

				<div className="grid gap-2">
					<label>Amount (KES)</label>
					<input
						type="number"
						value={withdrawAmount}
						onChange={(e) => setAmount(e.target.value)}
						className="rounded-md border-2 border-black bg-white px-4 py-2"
					/>
				</div>

				<Button type="submit"> Initiate transaction </Button>
			</form>

			<WithdrawalCards withdrawals={withdrawalsQuery.data ?? []} />
		</div>
	);
}

function WithdrawalCards({ withdrawals }) {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<>
			<input
				type="search"
				className="rounded-md border-2 border-black bg-white px-4 py-2"
				placeholder="Search for amount"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<section className="flex flex-col rounded-xl border-2 border-black bg-light-bg p-4">
				{withdrawals
					?.filter((item) => {
						return item.amount.toString()?.includes(searchTerm);
					})
					.sort((a, b) => a?.date < b?.date)
					.map((withdrawal, index) => {
						return <WithdrawalCard key={index} transfer={withdrawal} />;
					})}
			</section>
		</>
	);
}

function WithdrawalCard({ transfer: withdrawal }) {
	const w = new Withdrawal(withdrawal.phoneNumber, withdrawal.amount);

	return (
		<div className="flex flex-wrap justify-between border-b-2 border-black/20 px-2 py-4 last:border-b-0">
			<div className="flex flex-col gap-2">
				<span className="text-2xl font-semibold">KES {withdrawal.amount}</span>
				<span className="text-sm text-black/50">Transaction cost : KES {w?.transactionCost}</span>
			</div>

			<div className="flex flex-col gap-2 self-end">
				<span className="text-right text-xs text-black/50">{formatDate(withdrawal.date)}</span>
				<span className="text-right text-sm text-black/50">{formatRelativeTime(withdrawal.date)}</span>
			</div>
		</div>
	);
}
