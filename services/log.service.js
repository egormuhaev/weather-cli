import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSucces = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`
        ${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода справки
        -t [API_KEY] для сохранения токена
    `);
}

const printWeather = (weather, icon) => {
    console.log(
        dedent`
        ${chalk.bgYellow(' WEATHER ')} Погода в городе ${weather.name}
        ${icon}   ${weather.weather[0].description}
        Температура: ${weather.main.temp} (ощущается как ${weather.main.feels_like})
        Влажность: ${weather.main.humidity}%
        Скорость ветра: ${weather.wind.speed}
    `);
}

export { printError, printSucces, printHelp, printWeather };