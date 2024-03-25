import { getCurrentUserContact } from "../utils/cache";

export function BalanceCard() {
  const user = getCurrentUserContact();

  return (
    <div className="p-4 py-6 rounded-xl bg-blue-200 text-black w-96 mr-auto flex flex-col gap-3 border-2 border-black shadow-lg shadow-blue-300">
      <p class="text-md font-bold">Balance</p>
      <p class="text-4xl font-light">KES {user?.balance?.toLocaleString()}</p>
    </div>
  );
}
