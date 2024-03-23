import { Link } from "react-router-dom";

const links = [
  {
    name: "My Wallet",
    icon: "solar:wallet-2",
    route: "/",
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
];

function NavBar() {
  return (
    <div class="bg-emerald-300 p-4 flex flex-col gap-2">
      {links.map((link, index) => {
        return (
          <Link to={link.route} className="flex items-center gap-4" key={index}>
            <span className="text-3xl">
              <iconify-icon icon={`${link.icon}-line-duotone`}></iconify-icon>
            </span>
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default NavBar;
