// bringing the html to JS

import { useState } from "react";

// this function returns a React.Component
function Counter() {
	// create some state

	// initial state = 7
	let [myCount, setMyCount] = useState(7);

	const called = () => {
		// new state
		setMyCount(myCount + 1);
	};

	return (
		<div>
			<p>Count = {myCount} </p>
			<button onClick={called}> Increment </button>
		</div>
	);
}

refc;

export default Counter;
