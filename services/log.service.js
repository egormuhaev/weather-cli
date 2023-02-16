import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSucces = (message) => {
    console.log(chalk.bgGreen(' SUCCES ') + ' ' + message);
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

export { printError, printSucces, printHelp };