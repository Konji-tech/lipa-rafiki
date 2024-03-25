import { useState } from "react";
import { BalanceCard } from "../components/BalanceCard";
import Button from "../components/custom/Button";
import { getContacts } from "../utils/cache";

export default function SendPage() {
  const contacts = getContacts();

  // form state

  function handleSubmission(e) {
    // prevent page from reloading
    e.preventDefault();
  }

  return (
    <div className="flex justify-center items-center flex-col p-8 gap-8">
      <BalanceCard />

      <form
        onSubmit={handleSubmission}
        class="w-full grid gap-4 p-4 bg-light-bg border-2 border-black rounded-xl"
      >
        <h1 class="text-xl font-bold font-mono uppercase">Send Money</h1>

        <div class="grid gap-2">
          <label for="">Sending to </label>
          <select className="py-2 px-4 bg-white rounded-md border-2 border-black">
            {contacts.map((e) => (
              <option value={e.phoneNumber}>
                <span className="text-bold text-black/50">{e.phoneNumber}</span>
                {"    "}
                <span className="font-semibold">
                  {e.firstName} {e.lastName}
                </span>
              </option>
            ))}
          </select>
        </div>

        <div class="grid gap-2">
          <label for="">Amount (KES)</label>
          <input
            type="number"
            className="py-2 px-4 bg-white rounded-md border-2 border-black"
          />
        </div>

        <Button type="submit"> Initiate transactions </Button>
      </form>
    </div>
  );
}
