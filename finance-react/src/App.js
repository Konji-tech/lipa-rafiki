import NavBar from "./components/Navbar";
import Header from "./components/Header";

import WalletCards from "./components/WalletCards";
function App() {
  return (
    <div>
      <NavBar />

      <h1>This is my APP!</h1>
      <hr />
      <Header></Header>
      <WalletCards />
    </div>
  );
}

export default App;
