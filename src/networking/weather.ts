import { RespuestaTiempo } from "../model/weatherResponse";

const city = 'Example';

const API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`;

// TODO: Create an async function with an argument called city to return the that of the endpoint
export const getWeather = async (city: string): Promise<RespuestaTiempo> => {
    try {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`, requestOptions);
        return response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Propagar el error para que el llamador pueda manejarlo
    }
};

export const getWeatherPromise = async (city: string): Promise<RespuestaTiempo> => {
    try {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`, requestOptions)
        .then(response =>response.json());
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Propagar el error para que el llamador pueda manejarlo
    }
};
