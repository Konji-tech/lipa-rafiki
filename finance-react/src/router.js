import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import DepositPage from "./pages/DepositPage";
import SendPage from "./pages/SendPage";
import WalletPage from "./pages/WalletPage";
import WithdrawPage from "./pages/WithdrawPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <WalletPage /> },
      { path: "deposit", element: <DepositPage /> },
      { path: "send", element: <SendPage /> },
      { path: "withdraw", element: <WithdrawPage /> },
    ],
  },
]);
