import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";


const getWeathe = async () => {
    const token = process.env.TOKEN_TEST ?? (await getKeyValue(TOKEN_DICTIONARY.token));
    const city = await getKeyValue(TOKEN_DICTIONARY.city);

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


export { getWeathe }