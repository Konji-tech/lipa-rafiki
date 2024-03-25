import { Link } from "react-router-dom";
import { getCurrentUserContact } from "../utils/cache";

export default function WalletCards() {
	const user = getCurrentUserContact();
	console.log(user);

	return (
		<div className="grid  gap-4 px-4 py-8 lg:grid-cols-[auto,1fr]">
			<div className="mr-auto flex min-w-[300px] max-w-96 flex-col gap-3 rounded-xl border-2 border-black bg-blue-500 p-4 py-8 text-white shadow-lg shadow-blue-600">
				<p className="text-md font-bold">
					Hi {user?.firstName} {user?.lastName}
				</p>
				<p className="text-4xl font-light">KES {user?.balance}</p>
			</div>

			<div className="flex w-full flex-col  justify-stretch overflow-hidden rounded-xl border-2 border-black bg-white transition-colors sm:flex-row  ">
				<Link
					to="/send"
					className="flex flex-1 flex-col items-center justify-center gap-4  px-2 py-12 hover:bg-yellow-100"
				>
					<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-700 bg-yellow-200 text-4xl text-yellow-700">
						<iconify-icon icon="solar:upload-twice-square-line-duotone" />
					</div>
					<p className="font-semibold">Send Money</p>
				</Link>

				<Link
					to="/deposit"
					className="flex flex-1 flex-col items-center justify-center gap-4 px-2 py-12 hover:bg-green-100"
				>
					<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-700 bg-green-200 text-4xl text-green-700">
						<iconify-icon icon="solar:upload-twice-square-line-duotone" />
					</div>
					<p className="font-semibold">Deposit</p>
				</Link>
				<Link
					to="/withdraw"
					className="flex flex-1 flex-col items-center justify-center gap-4 px-2 py-12 hover:bg-blue-100"
				>
					<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-700 bg-blue-200 text-4xl text-blue-700">
						<iconify-icon icon="solar:download-twice-square-line-duotone" />
					</div>
					<p className="font-semibold">Withdraw</p>
				</Link>
			</div>
		</div>
	);
}
