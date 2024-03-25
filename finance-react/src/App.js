import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import { initState } from "./utils/init";

function App() {
  useEffect(() => {
    initState();
  });

  return (
    <div className="grid grid-cols-[100px,1fr] md:grid-cols-[240px,1fr] h-screen w-screen overflow-hidden transition-all">
      {/* the nav bar is shared*/}
      <NavBar />

      <div className="bg-bg overflow-auto">
        {/* Children go here */}
        <div className="max-w-screen-lg mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
