let cities = [
  "delhi",
  "mumbai",
  "bangalore",
  "chennai",
  "kolkata",
  "pune",
  "hyderabad",
  "mangalore",
  "jaipur",
  "chandigarh",
  "surat",
  "london",
  "new delhi",
];
let data = [];

// Function to fetch weather data for each city
const fetchData = async (city) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ee4dbc285emsh87a88e319567dc5p1dd464jsndf0c715c7a62",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to populate table with weather data
const populateTable = async () => {
  const tableBody = document.getElementById("weatherTable");
  for (const city of cities) {
    const weatherData = await fetchData(city);
    console.log(weatherData);
    if (weatherData) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="text-start" style="font-weight: bolder;">${
                  city[0].toUpperCase() + city.slice(1)
                }</td>
                <td>${weatherData.temp}</td>
                <td>${weatherData.humidity}</td>
                <td>${weatherData.cloud_pct}</td>
                <td>${weatherData.feels_like}</td>
                <td>${weatherData.min_temp}</td>
                <td>${weatherData.max_temp}</td>
                <td>${weatherData.wind_speed}</td>
                <td>${weatherData.wind_degrees}</td>
                <td>${new Date(
                  weatherData.sunrise * 1000
                ).toLocaleTimeString()}</td>
                <td>${new Date(
                  weatherData.sunset * 1000
                ).toLocaleTimeString()}</td>
            `;
      tableBody.appendChild(row);
    }
  }
};

// Call the function to populate the table
populateTable();
