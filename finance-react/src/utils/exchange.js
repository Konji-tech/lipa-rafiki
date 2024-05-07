export async function getExchangeRates() {
	const url = `https://exchange-rate-api1.p.rapidapi.com/latest?base=KES`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "970d5e0d03msh08d243d9bd0829dp176881jsn24a11d3d58e4",
			"X-RapidAPI-Host": "exchange-rate-api1.p.rapidapi.com",
		},
	};

	const response = await fetch(url, options);
	const result = await response.json();
	return result;
}
