import { twMerge } from "tw-merge";

export default function Button({
	children,
	type = "button",
	onClick = () => {},
	className = "",
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={twMerge(
				"flex items-center gap-4 rounded-xl border-2 border-black bg-primary px-4 py-2 font-semibold uppercase text-white hover:scale-[1.01]",
			)}
		>
			{children}
		</button>
	);
}
