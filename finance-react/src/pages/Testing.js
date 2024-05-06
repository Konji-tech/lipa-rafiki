import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../utils/firebase";

function TestPage() {
	const [data, setData] = useState(null);

	const getTestData = async function () {
		const res = [];

		const querySnapshot = await getDocs(collection(db, "test_data"));
		querySnapshot.forEach((doc) => {
			res.push(doc.data());
		});

		setData(res);
	};

	useEffect(() => {
		getTestData();
	}, []);

	return (
		<div className="p-4">
			<pre> {JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

export default TestPage;
