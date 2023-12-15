import { DiasDeSemana, IconoTiempo, TiempoIconoTipo, RespuestaTiempo } from "../model/weatherResponse";

// TODO: Create references for all the html elements
export const buttonClick = document.getElementById("button-location");
const temperatura =  document.getElementById("weather-temp");
const descripcionTiempo = document.getElementById("weather-desc");
const tiempoIconoPng = document.getElementById("weather-icon");
const UbicacionTexto = document.getElementById("location-text");
const FechaDiaNombre = document.getElementById("date-dayname");
const FechaDia = document.getElementById("date-day");
const maxTemperatura = document.getElementById("text-temp-max");
const minTemperatura = document.getElementById("text-temp-min");
const humedad = document.getElementById("text-humidity");
const wiento = document.getElementById("text-wind");
const ubicacionTiempo = document.getElementById("weather-location-input");

// TODO: Create the logic of the function
export const updateInteface = async (weather: RespuestaTiempo): Promise<void> => {
    try {
        showSpinner();
        disableButton();

        if (temperatura) temperatura.textContent = Math.floor(weather.main.temp).toString() + "ºC";
        if (descripcionTiempo) descripcionTiempo.textContent = weather.weather[0].main;
        changeWeatherIcon(weather.weather[0].icon ?? '01d');

        if (UbicacionTexto) UbicacionTexto.textContent = weather.name;
        if (FechaDiaNombre) FechaDiaNombre.textContent = getDayOfWeek();
        if (FechaDia) FechaDia.textContent = getDate();

        if (maxTemperatura) maxTemperatura.textContent = Math.floor(weather.main.temp_max) + " ºC";
        if (minTemperatura) minTemperatura.textContent = Math.floor(weather.main.temp_min) + " ºC";
        if (humedad) humedad.textContent = weather.main.humidity.toString() + " %";
        if (wiento) wiento.textContent = weather.wind.speed.toString() + " m/s";
    } catch (error) {
        console.error('Error updating interface:', error);
    } finally {
        hideSpinner();
        enableButton();
    }
};

function showSpinner() {
    const spinnerElement = document.getElementById("spinner"); // Reemplaza "spinner" con el ID real de tu elemento spinner
    if (spinnerElement) {
        spinnerElement.style.display = "block";
    }
}

function hideSpinner() {
    const spinnerElement = document.getElementById("spinner"); // Reemplaza "spinner" con el ID real de tu elemento spinner
    if (spinnerElement) {
        spinnerElement.style.display = "none";
    }
}

function disableButton() {
    if (buttonClick) (buttonClick as HTMLButtonElement).disabled = true;
}

function enableButton() {
    if (buttonClick) (buttonClick as HTMLButtonElement).disabled = false;
}

// Helper function to get the day of the week
export function getCity(): string {
    if(ubicacionTiempo) {
        return (ubicacionTiempo as HTMLInputElement).value;
    }
    return "";
}

function getDayOfWeek(): string {
    let day = new Date();
    return DiasDeSemana[day.getDay()];
}

function getDate(): string {
    let date = new Date();
    return date.toLocaleDateString("es-ES");
}

function changeWeatherIcon(weatherImageRef: string) {
    const weatherMap = [weatherImageRef];
    validateImage(weatherMap);
    const mappedWeather = weatherMap.map(weather => IconoTiempo[weather])[0] ?? IconoTiempo["01d"];
    if(typeof mappedWeather[0] === "string") {
        if (tiempoIconoPng) (tiempoIconoPng as HTMLImageElement).src = mappedWeather;
    }
}

function validateImage(values: string[]): asserts values is TiempoIconoTipo[] {
    if (!values.every(isValidImage)) {
        throw Error('invalid image');    
    }
}

function isValidImage(value: string): value is TiempoIconoTipo {
    return value in IconoTiempo;
}