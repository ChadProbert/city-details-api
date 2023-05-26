async function myWikiData() {
	let cityName = "Johannesburg";
	const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "9827135a86mshfdd6bf4d45631a4p1e948bjsnbce4ebd5b4b7",
			"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
		},
	};
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result.data[3].wikiDataId);
		let wiki = result.data[3].wikiDataId;
		return wiki;
	} catch (error) {
		console.error(error);
	}
}

async function myCoordinates() {
	try {
		// Get the wikiDataId from myWikiData function
		const wiki = await myWikiData();
		// waits 2 seconds before running the code inside setTimeout
		setTimeout(async () => {
			const url1 = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${wiki}`;
			const options1 = {
				method: "GET",
				headers: {
					"X-RapidAPI-Key":
						"9827135a86mshfdd6bf4d45631a4p1e948bjsnbce4ebd5b4b7",
					"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
				},
			};
			try {
				const resp = await fetch(url1, options1);
				const res = await resp.json();
				console.log(`Elevation: ${res.data.elevationMeters}`);
				console.log(`Population: ${res.data.population}`);
				// will use these variables for the weather API url
				const lat = res.data.latitude;
				const long = res.data.longitude;
				console.log(lat, long);
			} catch (error) {
				console.error(error);
			}
			// sets the duration of the timeout to 2000 milliseconds (2 seconds)
		}, 2000);
	} catch (error) {
		console.error(error);
	}
}

myCoordinates();
