export default function Button({ children, type = "button" }) {
	return (
		<button
			type={type}
			className="rounded-xl border-2 border-black bg-primary px-4 py-2 font-semibold uppercase text-white hover:scale-[1.01]"
		>
			{children}
		</button>
	);
}
