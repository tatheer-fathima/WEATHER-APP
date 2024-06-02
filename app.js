document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const searchButton = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
  
    searchButton.addEventListener('click', () => {
      const APIKey = '2c525130088fdf9df43de12a43b5fba9';
      console.log(APIKey);
      const city = document.querySelector('.search-box input').value;
      if (city === '') return;
  
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
          if (json.cod === 200) {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .Wind span');
  
            switch (json.weather[0].main) {
              case 'Clear':
                image.src = './clear.png';
                break;
              case 'Rain':
                image.src = './rain.png';
                break;
              case 'Snow':
                image.src = './snow.png';
                break;
              case 'Clouds':
                image.src = './cloud.png';
                break;
              case 'Haze':
              case 'Mist':
                image.src = './mist.png';
                break;
              default:
                image.src = './404.png';
                break;
            }
  
            temperature.textContent = `${Math.round(json.main.temp)} °C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} m/s`;
  
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
          } else {
            alert('City not found');
          }
        })
        .catch(error => {
          console.error('Error fetching the weather data:', error);
          alert('Failed to retrieve weather data. Please try again later.');
        });
    });
});
