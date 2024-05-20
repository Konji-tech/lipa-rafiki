export async function getExchangeRates() {
	const url = `https://exchange-rate-api1.p.rapidapi.com/latest?base=KES`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "b13d7b72d6mshc2925428c9d05bap1ee7b5jsnafa1e8dc07d5",
			"X-RapidAPI-Host": "exchange-rate-api1.p.rapidapi.com",
		},
	};

	const response = await fetch(url, options);
	const result = await response.json();
	return result;
}
