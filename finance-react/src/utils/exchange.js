export async function getExchangeRates() {
	const url = `https://exchange-rate-api1.p.rapidapi.com/latest?base=KES`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "5dea281b7816d44010d56082d035c94e",
			"X-RapidAPI-Host": "exchange-rate-api1.p.rapidapi.com",
		},
	};

	const response = await fetch(url, options);
	const result = await response.json();
	return result;
}
