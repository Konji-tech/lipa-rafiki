const links = [
  {
    name: "My Wallet",
    icon: "",
    route: "/",
  },
  {
    name: "Send Money",
    icon: "",
    route: "/send",
  },
  {
    name: "Withdraw Cash",
    icon: "",
    route: "/withdraw",
  },
];

function NavBar() {
  return (
    <div class="bg-emerald-300 p-4 flex flex-col gap-2">
      {links.map((link) => {
        return <a href={link.route}> {link.name} </a>;
      })}
    </div>
  );
}

export default NavBar;
