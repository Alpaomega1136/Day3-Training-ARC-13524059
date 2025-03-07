// Local API Interaction
async function loadQuote() {
    try {
      const quotesElement = document.getElementById('quotes');
      quotesElement.innerHTML = '<p class="loading">Loading quote...</p>';

      const response = await fetch('http://localhost:3000/api/quotes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      const data = jsonData.data; 
      
      quotesElement.innerHTML = `
        <p class="quote-text">"${data.quote}"</p>
        <p class="quote-author">- ${data.author}</p>
      `;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('quotes').innerHTML = 
        '<p class="error">Failed to load quote. Please try again.</p>';
    }
  }
  
  // Public API Integration (OpenWeatherMap)
  async function loadWeather() {
    try {
      const weatherElement = document.getElementById('weather');
      weatherElement.innerHTML = '<p class="loading">Loading weather data...</p>';
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Jakarta&units=metric&appid=4589cf82a501573c5a66af93bf45f96b'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.main || !data.weather?.[0]) {
        throw new Error('Invalid weather data structure');
      }
      
      weatherElement.innerHTML = `
        <div class="weather-info">
          <p>Temperature: <span class="weather-value">${Math.round(data.main.temp)}°C</span></p>
          <p>Humidity: <span class="weather-value">${data.main.humidity}%</span></p>
          <p>Condition: <span class="weather-value">${data.weather[0].description}</span></p>
        </div>
      `;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('weather').innerHTML = 
        '<p class="error">Failed to load weather data. Please refresh the page.</p>';
    }
  }
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    loadQuote();
    loadWeather();
    
    document.getElementById('refreshBtn').addEventListener('click', () => {
      loadQuote();
    });
  });
  