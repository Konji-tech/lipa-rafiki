import { queryKeys } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";

function TestPage() {
	const exchangeQuery = useQuery({ queryKey: queryKeys.exchange });

	return (
		<div className="p-4">
			<pre> {JSON.stringify(exchangeQuery.data, null, 2)}</pre>
		</div>
	);
}

export default TestPage;
