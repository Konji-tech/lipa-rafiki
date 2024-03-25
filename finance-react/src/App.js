import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import { initState } from "./utils/init";

function App() {
	useEffect(() => {
		initState();
	});

	return (
		<div className="grid h-screen w-screen grid-cols-[100px,1fr] overflow-hidden transition-all md:grid-cols-[240px,1fr]">
			{/* the nav bar is shared*/}
			<NavBar />

			<div className="overflow-auto bg-bg">
				{/* Children go here */}
				<div className="mx-auto max-w-screen-lg">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default App;
