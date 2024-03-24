import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import { initState } from "./utils/init";

function App() {
  useEffect(() => {
    initState();
  });

  return (
    <div className="grid grid-cols-[240px,1fr] h-screen w-screen overflow-hidden">
      {/* the nav bar is shared*/}
      <NavBar />

      <div className="bg-bg">
        {/* Children go here */}
        <div class="max-w-screen-lg mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
