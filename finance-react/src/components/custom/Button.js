export default function Button({ children, type = "button" }) {
  return (
    <button
      type={type}
      className="bg-primary px-4 py-2 rounded-xl border-2 border-black hover:scale-[1.01] text-white font-semibold uppercase"
    >
      {children}
    </button>
  );
}
