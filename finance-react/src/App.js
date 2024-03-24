import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="grid grid-cols-[240px,1fr] h-screen w-screen overflow-hidden">
      {/* the nav bar is shared*/}
      <NavBar />

      <div>
        {/* Children go here */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
