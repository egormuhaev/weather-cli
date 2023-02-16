import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const ICON_COLLECTION = {
    '01': '\u2600\uFE0F',
    '02': '\uD83C\uDF24\uFE0F',
    '03': '\u2601\uFE0F',
    '04': '\u2601\uFE0F',
    '09': '\uD83C\uDF27\uFE0F',
    '10': '\uD83C\uDF26\uFE0F',
    '11': '\uD83C\uDF29\uFE0F',
    '13': '\u2744\uFE0F',
    '50': '\u2601\uFE0F'
}

const getIcon = (icon) => {
    const arr = ['10', '12'];
    if (icon.slice(0, -1) in ICON_COLLECTION){
        return ICON_COLLECTION[icon.slice(0, -1)];
    } else {
        return '\u2601\uFE0F'
    }
}


const getWeathe = async () => {
    const token = process.env?.TOKEN_TEST ?? (await getKeyValue(TOKEN_DICTIONARY.token));
    const city = await getKeyValue(TOKEN_DICTIONARY.city) ?? process.env?.CITY;

    if (!token) {
        throw new Error('TOKEN IS NULL, PLEASE SET TOKEN');
    } 

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: "ru",
            units: "metric"
        }
    });

    return data;
}


export { getWeathe, getIcon }