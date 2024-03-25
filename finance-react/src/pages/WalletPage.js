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

			<div className="flex p-4">
				<Button onClick={reset}>
					<span class="flex text-3xl">
						<iconify-icon icon="solar:danger-triangle-bold-duotone"></iconify-icon>
					</span>
					<span>Reset local storage</span>
				</Button>
			</div>
		</div>
	);
}
