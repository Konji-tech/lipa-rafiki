import { Link, useLocation, useNavigation } from "react-router-dom";
import { twMerge } from "tw-merge";

const links = [
	{
		name: "My Wallet",
		icon: "solar:wallet-2",
		route: "/",
	},
	{
		name: "Deposit",
		icon: "solar:cardholder",
		route: "/deposit",
	},
	{
		name: "Send Money",
		icon: "solar:card-send",
		route: "/send",
	},
	{
		name: "Withdraw Cash",
		icon: "solar:card-recive",
		route: "/withdraw",
	},
	{
		name: "Exchange",
		icon: "solar:graph-up",
		route: "/exchange",
	},
	{
		name: "Tests",
		icon: "solar:bug",
		route: "/testing",
	},
	,
];

function NavBar() {
	const location = useLocation();

	return (
		<div className="flex flex-col gap-2 border-r-2 border-black bg-light-bg p-4">
			{links.map((link, index) => {
				return (
					<Link
						to={link.route}
						className={`flex items-center gap-4 rounded-xl border-2 px-4 py-2 ${
							location?.pathname === link.route ? "border-black bg-white text-primary shadow-lg" : "border-transparent text-black"
						}`}
						key={index}
						title={link.name}
					>
						<span className="flex h-full items-center text-3xl">
							<iconify-icon icon={`${link.icon}-${location?.pathname === link.route ? "bold" : "line"}-duotone`}></iconify-icon>
						</span>
						<span className="hidden text-black md:block">{link.name}</span>
					</Link>
				);
			})}
		</div>
	);
}

export default NavBar;
