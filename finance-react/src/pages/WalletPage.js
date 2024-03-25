import { Contacts } from "../components/Contacts";
import WalletCards from "../components/WalletCards";

export default function WalletPage() {
	return (
		<div className="flex flex-col">
			<WalletCards />
			<Contacts />
		</div>
	);
}
