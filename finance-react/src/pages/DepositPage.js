import { useState } from "react";
import * as cache from "../utils/cache";
import { Deposit } from "../utils/finance";
import { formatDate } from "../utils/strings";

export default function DepositPage() {
  const [deposits, setDeposits] = useState(cache.getDeposits());

  const [phoneNumber, setPhoneNumber] = useState(cache.userPhoneNumber);
  const [amount, setAmount] = useState(0);

  function handleSubmit(e) {
    // prevent the page from reloading
    e.preventDefault();

    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // make a deposit
    const deposit = new Deposit(phoneNumber, parseFloat(amount));
    alert(`KES ${deposit.amount} deposited to your account`);

    // refresh page data
    setDeposits(cache.getDeposits());
    setAmount(0);
  }

  return (
    <div class="flex flex-col p-4 gap-8">
      <form
        onSubmit={handleSubmit}
        class="grid gap-4 bg-light-bg  p-4 border-2 border-black rounded-xl shadow-sm"
      >
        <h1 class="text-xl font-bold font-mono uppercase"> Make a deposit</h1>

        <div class="grid gap-2">
          <label> Phone Number </label>
          <input
            type="text"
            disabled
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="px-4 py-2 bg-bg  cursor-not-allowed border-2 border-black rounded"
          />
        </div>

        <div class="grid gap-2">
          <label for=""> Amount </label>
          <input
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            class="px-4 py-2 bg-white border-2 border-black rounded"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          class="bg-primary px-4 py-2 rounded-xl border-2 border-black hover:scale-[1.01] text-white font-semibold uppercase"
        >
          Initiate transaction
        </button>
      </form>

      <h1 className="text-xl text-black/70 text-center"> History </h1>

      {/*DEPOSITS ALREADY SAVED*/}

      <DepositSection deposits={deposits} />
    </div>
  );
}

function DepositSection({ deposits }) {
  return (
    <section className="p-4 rounded-xl bg-light-bg border-2 border-black flex flex-col">
      {deposits.map((_deposit, index) => (
        <DepositCard key={index} deposit={_deposit} />
      ))}
    </section>
  );
}

function DepositCard({ deposit }) {
  return (
    <div className="py-4 px-2 flex border-black/20 border-b-2  last:border-b-0 justify-between flex-wrap gap-4">
      <div class="flex flex-col gap-2">
        <span className="text-2xl font-semibold">KES {deposit.amount}</span>
        <span>{deposit.phoneNumber}</span>
      </div>
      <span className="self-end text-black/50">{formatDate(deposit.date)}</span>
    </div>
  );
}
