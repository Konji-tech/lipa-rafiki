import { Contacts } from "../components/Contacts";
import Button from "../components/custom/Button";
import WalletCards from "../components/WalletCards";
import { setCache } from "../utils/cache";

export default function WalletPage() {
	function reset() {
		["withdrawals", "transfers", "contacts", "deposits"].forEach((key) => {
			console.log(`Resetting`, key);
			setCache(key, []);
		});
		window.location.reload();
	}

	return (
		<div className="flex flex-col">
			<WalletCards />
			<Contacts />
		</div>
	);
}
