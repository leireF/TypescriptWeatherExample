import { getWeather } from './networking/weather';
import { getWeatherPromise } from './networking/weather';

// Style import
import './styles/main.scss';

// Import the API request method
import { buttonClick, getCity, updateInteface } from './dom-manipulation/domManipulation';

// Create an async function to call the API method
export const displayWeather = async () => {
    const city = getCity();
    if (city) {
        try {
            const weather = await getWeather(city);
            updateInteface(weather);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Puedes mostrar un mensaje de error al usuario si es necesario
        }
    }
}

export const displayWeatherPromise = () => {
    const city = getCity();
    if (city) {
        getWeatherPromise(city)
            .then(weather => updateInteface(weather))
            .catch(error => {
                console.error('Error fetching weather data:', error);
                // Puedes mostrar un mensaje de error al usuario si es necesario
            });
    }
}

// Add an event listener to the button
if (buttonClick) buttonClick.addEventListener('click', displayWeather);