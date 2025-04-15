/*
      Default location to display in the header (Wichita, KS).
      Default forecast URL for the National Weather Service (NWS) for that location.
    */
      const defaultCity = "Wichita, KS";
      const defaultForecastUrl = "https://api.weather.gov/gridpoints/ICT/31,80/forecast";
  
      /*
        A collection of background image URLs keyed by time of day or weather condition.
        We'll switch background images based on the current hour or the forecast.
      */
      const weatherBackgrounds = {
        morning:
          "https://images.squarespace-cdn.com/content/v1/5c7dd9e0a9ab952d5c19256e/1706984141544-4SZ41M4RDXXHVBHGS19S/IMG_2721.GIF",
        evening:
          "https://cdn.pixabay.com/animation/2023/09/15/18/09/18-09-18-193_512.gif",
        night: "https://giffiles.alphacoders.com/144/14465.gif",
        clear:
          "https://i.pinimg.com/originals/dd/74/eb/dd74eb9aa00d78db0e02d9beb06e6de0.gif",
        rainy: "https://media0.giphy.com/media/l3vRbNFMuFt5Zm372/giphy.gif",
        default:
          "https://i.pinimg.com/originals/dd/74/eb/dd74eb9aa00d78db0e02d9beb06e6de0.gif",
      };
  
      /*
        Determine the time of day based on the current hour:
          - 5 AM to 12 PM: morning
          - 12 PM to 6 PM: clear (afternoon)
          - 6 PM to 9 PM: evening
          - otherwise: night
      */
      function getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "morning";
        if (hour >= 12 && hour < 18) return "clear";
        if (hour >= 18 && hour < 21) return "evening";
        return "night";
      }
  
      /*
        Fetch the weather data from the provided URL (using NWS API).
        - On success, update all the text fields with temperature, condition, etc.
        - Also update the background image based on the current time of day.
      */
      function getWeather(url) {
        // Use a custom User-Agent to avoid issues with the NWS API.
        fetch(url, {
          headers: {
            "User-Agent": "WeatherDashboard (your@email.com)"
          }
        })
          .then((response) => response.json())
          .then((data) => {
            // 'periods' is an array of forecast information
            const forecast = data.properties.periods;
  
            // Current temperature in Fahrenheit (first period in the forecast)
            document.getElementById("temperature").textContent =
              `${forecast[0].temperature}\u00B0F`;
  
            // Detailed forecast text (e.g., "Sunny with a high near 54...")
            document.getElementById("condition").innerText =
              forecast[0].detailedForecast;
  
            // High/Low: using slash "/" to avoid strange character encoding issues
            document.getElementById("high-low").textContent =
              `Day ${forecast[1].temperature}\u00B0 / Night ${forecast[2].temperature}\u00B0`;
  
            // Morning, Afternoon, Evening, Overnight temperatures
            document.getElementById("morning-temp").textContent =
              `${forecast[1].temperature}\u00B0`;
            document.getElementById("afternoon-temp").textContent =
              `${forecast[2].temperature}\u00B0`;
            document.getElementById("evening-temp").textContent =
              `${forecast[3].temperature}\u00B0`;
            document.getElementById("overnight-temp").textContent =
              `${forecast[4].temperature}\u00B0`;
  
            // Decide which background to use based on time of day
            const timeOfDay = getTimeOfDay();
            document.body.style.backgroundImage =
              `url(${weatherBackgrounds[timeOfDay] || weatherBackgrounds.default})`;
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      }
  
      /*
        When the DOM is fully loaded:
          - Display the default city name
          - Fetch and display the weather data from the default forecast URL
      */
      document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("location").innerText = defaultCity;
        getWeather(defaultForecastUrl);
      });
  
      /*
        Continuously update the displayed time every second.
        The 'As of hh:mm:ss CST' text will reflect the current time.
      */
      function updateDateTime() {
        const now = new Date();
        document.getElementById("datetime").innerText =
          `As of ${now.toLocaleTimeString()} CST`;
      }
  
      // Call updateDateTime every second to keep the time fresh
      setInterval(updateDateTime, 1000);
      // Update immediately on page load
      updateDateTime();