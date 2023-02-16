#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printError, printSucces, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeathe, getIcon } from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('TOKEN IS NULL');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSucces("TOKEN SAVE");
    } catch (error) {
        printError(`TOKEN DONT SAVE: ${error.message}`);
    }
}


const saveCity = async (city) => {
    if(!city.length) {
        printError('CITY IS NULL');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSucces("CITY SAVE");
    } catch (error) {
        printError(`CITY DONT SAVE ${error.message}`);
    }
}


const getForCast = async (city) => {
    try {
        const weather = await getWeathe(city);
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('INVALID CITY');
        }

        else if (error?.response?.status == 401) {
            printError("INVALID TOKEN");
        }
        else {
            printError(error.message);
        }
    }
}


const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return  saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }

    return getForCast();
}

initCLI();