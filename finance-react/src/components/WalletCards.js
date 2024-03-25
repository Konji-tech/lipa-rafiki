import { Link } from "react-router-dom";
import { getCurrentUserContact } from "../utils/cache";

export default function WalletCards() {
	const user = getCurrentUserContact();
	console.log(user);

	return (
		<div className="flex flex-row flex-wrap gap-4 px-4 py-8">
			<div className="mr-auto flex w-96 flex-col gap-3 rounded-md border-2 border-black bg-blue-500 p-4 py-6 text-white shadow-lg shadow-blue-600">
				<p className="text-md font-bold">
					Hi {user?.firstName} {user?.lastName}
				</p>
				<p className="text-4xl font-light">KES {user?.balance}</p>
			</div>

			<div className="flex h-48 overflow-hidden rounded-xl border-2 border-black bg-white transition-colors">
				<Link
					to="/send"
					className="flex w-48 flex-col items-center justify-center gap-4 border-r-2 border-black p-2 hover:bg-green-100"
				>
					<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-700 bg-green-200 ">
						<iconify-icon
							icon="solar:upload-twice-square-line-duotone"
							className="text-4xl text-green-700"
						/>
					</div>
					<p className="font-semibold">Send Money</p>
				</Link>
				<Link
					to="/withdraw"
					className="flex w-48 flex-col items-center justify-center gap-4 p-2 hover:bg-blue-100"
				>
					<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-700 bg-blue-200 ">
						<iconify-icon
							icon="solar:download-twice-square-line-duotone"
							className="text-4xl text-blue-700"
						/>
					</div>
					<p className="font-semibold">Withdraw Money</p>
				</Link>
			</div>
		</div>
	);
}
