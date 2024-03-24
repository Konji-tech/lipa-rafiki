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
    icon: "solar:card-send",
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
];

function NavBar() {
  const location = useLocation();

  return (
    <div class="bg-light-bg p-4 flex flex-col gap-2 border-r-2 border-black">
      {links.map((link, index) => {
        return (
          <Link
            to={link.route}
            className={`flex items-center gap-4 px-4 py-2 rounded-xl border-2 ${
              location?.pathname === link.route
                ? "bg-white text-black shadow-lg border-black"
                : "text-black border-transparent"
            }`}
            key={index}
          >
            <span className="text-3xl h-full flex items-center">
              <iconify-icon icon={`${link.icon}-line-duotone`}></iconify-icon>
            </span>
            <span>{link.name} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default NavBar;
