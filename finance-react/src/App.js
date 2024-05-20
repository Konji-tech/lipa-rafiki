import { Outlet } from "react-router-dom";
import { Toaster, toast } from "sonner";

import NavBar from "./components/Navbar";
import database from "./utils/database";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./utils/constants";
import { getExchangeRates } from "./utils/exchange";

function App() {
	useQuery({ queryKey: queryKeys.withdrawals, queryFn: database.getWithdrawals });
	useQuery({ queryKey: queryKeys.deposits, queryFn: database.getDeposits });
	useQuery({ queryKey: queryKeys.transfers, queryFn: database.getTransfers });
	useQuery({ queryKey: queryKeys.contacts, queryFn: database.getContacts });
	useQuery({ queryKey: queryKeys.exchange, queryFn: getExchangeRates, refetchOnMount: false, staleTime: 60 * 60 * 1e3 });

	return (
		<div className="grid h-screen w-screen grid-cols-[100px,1fr] overflow-hidden transition-all md:grid-cols-[240px,1fr]">
			{/* the nav bar is shared*/}
			<NavBar />

			<div className="overflow-auto bg-bg">
				{/* Children go here */}
				<div className="mx-auto max-w-screen-lg">
					<Toaster richColors position="top-right" />
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default App;
