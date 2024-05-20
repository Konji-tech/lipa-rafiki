import { useEffect, useState } from "react";
import { BalanceCard } from "../components/BalanceCard";
import Button from "../components/custom/Button";
import { getContacts, getCurrentUserContact, userPhoneNumber } from "../utils/cache";

import { queryKeys } from "../utils/constants";

import { getNameByPhoneNumber, Transfer, getTransactionCostForAmount } from "../utils/finance";
import { formatDate, formatRelativeTime } from "../utils/strings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner"; //notification

export default function SendPage() {
	const user = getCurrentUserContact();
	const contacts = getContacts();

	// Calling the API
	const transfersQuery = useQuery({ queryKey: queryKeys.transfers });
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });
	const queryClient = useQueryClient();

	const [sendAmount, setAmount] = useState(0);
	const [receiver, setReceiver] = useState(contacts[0].phoneNumber);

	function getReceiverData() {
		return contacts.find((e) => e.phoneNumber == receiver);
	}

	//to convert amount being sent
	function getForeignAmount() {
		const rate = exchangeQuery?.data?.rates[getReceiverData()?.currency];
		return sendAmount * rate;
	}

	//To convert transaction cost
	function getForeignTransactionCost() {
		const transactionCost = getTransactionCostForAmount(sendAmount);
		const rate = exchangeQuery?.data?.rates[getReceiverData()?.currency];
		return transactionCost * rate;
	}

	async function init() {
		queryClient.invalidateQueries(queryKeys.transfers);
	}

	// form state
	async function handleSubmission(e) {
		// prevent page from reloading when form is submitted
		e.preventDefault();

		// validate available amount
		if (sendAmount <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}

		if (sendAmount > user.balance) {
			toast.error("Your balance is insufficient");
			return;
		}

		const transcation = new Transfer(userPhoneNumber, receiver, parseFloat(sendAmount));
		await transcation.save();

		// update page data
		init();
		setAmount(0);

		//notification
		const myPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ name: "Success" });
			}, 2000);
		});

		toast.promise(myPromise, {
			loading: "Sending...",
			success: `  ${sendAmount} has been sent to ${getNameByPhoneNumber(receiver)}, Transaction Cost : ${getTransactionCostForAmount(sendAmount)}`,
			error: "Error Occurred",
		});
	}

	return (
		<div className="flex flex-col gap-8 px-4 py-8">
			<BalanceCard />
			<Toaster richColors position="top-right" />

			<form onSubmit={handleSubmission} className="grid gap-4 rounded-xl border-2 border-black bg-light-bg p-4">
				<h1 className="font-mono text-xl font-bold uppercase">Send Money</h1>

				<div className="grid gap-2">
					<label>
						<span>Sending to </span>
						{getNameByPhoneNumber(receiver)}
					</label>
					<select
						className="rounded-md border-2 border-black bg-white px-4 py-2"
						value={receiver}
						onChange={(e) => setReceiver(e.target.value)}
					>
						{contacts.map((e, index) => (
							<option value={e.phoneNumber} key={index}>
								{e.firstName} {e.lastName}
								{"    "}
								{e.phoneNumber}
							</option>
						))}
					</select>
				</div>

				<div className="grid gap-2">
					<label>Amount (KES)</label>
					<input
						type="number"
						value={sendAmount}
						onChange={(e) => setAmount(e.target.value)}
						className="rounded-md border-2 border-black bg-white px-4 py-2"
					/>
				</div>

				{/* currency information */}
				<div className="flex items-center gap-4 rounded-xl bg-blue-200 p-4 text-blue-600">
					<span className="flex items-center text-3xl">
						<iconify-icon icon="solar:info-circle-bold-duotone" />
					</span>
					<span>Converted to</span>
					<span>
						{getForeignAmount().toLocaleString("en-US", {
							style: "currency",
							currency: getReceiverData()?.currency,
						})}
					</span>
				</div>

				<p className="font-bold italic text-black/50">
					<span>Transaction cost :</span>
					<span>KES {new Transfer(userPhoneNumber, receiver, sendAmount)?.transactionCost}</span>
					<p>
						<span>Converted to : </span>
						{/* Display converted transaction cost */}
						<span>
							{getForeignTransactionCost().toLocaleString("en-US", {
								style: "currency",
								currency: getReceiverData()?.currency,
							})}
						</span>
					</p>
				</p>

				<Button type="submit">Initiate transactions</Button>
			</form>

			<TransferCards transfers={transfersQuery.data ?? []} />
		</div>
	);
}

function TransferCards({ transfers }) {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<>
			<input
				type="search"
				className="rounded-md border-2 border-black bg-white px-4 py-2"
				placeholder="Search for name, phone number or amount"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<section className="flex flex-col rounded-xl border-2 border-black bg-light-bg p-4">
				{transfers
					.filter((item) => {
						return (
							getNameByPhoneNumber(item.receiver).toLowerCase().includes(searchTerm.toLowerCase()) ||
							item.receiver.includes(searchTerm) ||
							item.amount.toString().includes(searchTerm)
						);
					})
					.sort((a, b) => a?.date < b?.date)
					.map((transfer, index) => {
						return <TransferCard key={index} transfer={transfer} />;
					})}
			</section>
		</>
	);
}

function TransferCard({ transfer }) {
	return (
		<div className="flex flex-wrap justify-between border-b-2 border-black/20 px-2 py-4 last:border-b-0">
			<div className="flex flex-col gap-2">
				<span className="text-2xl font-semibold">KES {transfer.amount}</span>
				<span className="text-black/50">{getNameByPhoneNumber(transfer.receiver)}</span>
				<span>{transfer.receiver}</span>
			</div>

			<div className="flex flex-col gap-2 self-end">
				<span className="text-right text-xs text-black/50">{formatDate(transfer?.date)}</span>
				<span className="text-right text-sm text-black/50">{formatRelativeTime(transfer?.date)}</span>
			</div>
		</div>
	);
}
