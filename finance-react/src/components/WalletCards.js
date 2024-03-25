import { Link } from "react-router-dom";
import { getCurrentUserContact } from "../utils/cache";

export default function WalletCards() {
  const user = getCurrentUserContact();
  console.log(user);

  return (
    <div className="flex flex-row flex-wrap gap-4 px-4 py-8">
      <div className="p-4 py-6 rounded-md bg-blue-500 text-white w-96 mr-auto flex flex-col gap-3 border-2 border-black shadow-lg shadow-blue-600">
        <p class="text-md font-bold">
          Hi {user?.firstName} {user?.lastName}
        </p>
        <p class="text-4xl font-light">KES {user?.balance}</p>
      </div>

      <div className="flex rounded-xl bg-white border-2 h-48 border-black overflow-hidden transition-colors">
        <Link
          to="/send"
          class="p-2 border-r-2 border-black flex flex-col items-center justify-center w-48 gap-4 hover:bg-green-100"
        >
          <div class="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center border-2 border-green-700 ">
            <iconify-icon
              icon="solar:upload-twice-square-line-duotone"
              class="text-4xl text-green-700"
            />
          </div>
          <p class="font-semibold">Send Money</p>
        </Link>
        <Link
          to="/withdraw"
          class="p-2 flex flex-col items-center justify-center w-48 gap-4 hover:bg-blue-100"
        >
          <div class="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center border-2 border-blue-700 ">
            <iconify-icon
              icon="solar:download-twice-square-line-duotone"
              class="text-4xl text-blue-700"
            />
          </div>
          <p class="font-semibold">Withdraw Money</p>
        </Link>
      </div>
    </div>
  );
}
