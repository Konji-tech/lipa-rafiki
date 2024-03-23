import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/Navbar";
import WalletPage from "./pages/WalletPage";
import SendPage from "./pages/SendPage";
import WithdrawPage from "./pages/WithdrawPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* the nav bar is shared*/}
        <NavBar />

        <div>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<WalletPage />} />
            <Route path="/send" element={<SendPage />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
