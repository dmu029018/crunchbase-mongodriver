import dao from './dao.mjs'
import readline from 'readline';
import chalk from "chalk";
import fs from 'fs';

let nOptions = 0;

//CONFIG CONSTANTS
const MENU_OPT_FILE_PATH = './data/menu.txt';
const MENU_HEADER = chalk.blue('MENU:\n--------------------------------------\n');
const MENU_OPT_SEPARATOR = '.- ';

const userIOInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let readFileInterface;

async function printMenu() {

    nOptions = 0;

    readFileInterface = readline.createInterface({
      input: fs.createReadStream(MENU_OPT_FILE_PATH),
      //output: process.stdout
    });
    userIOInterface.write(MENU_HEADER);

    readFileInterface.on('line',  line => {
      const lineParts = line.toString().split(MENU_OPT_SEPARATOR, 2);
      userIOInterface.write(`${chalk.blue(lineParts[0])}: ${chalk.yellow(lineParts[1])}\n`);
      nOptions++;
    });

    readFileInterface.on("end",  _ => {
      readFileInterface.close();
    });
}

async function clear() {
  const blank = '\n'.repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

function askForKeyToContinue() {
  userIOInterface.question(chalk.yellow('\nType enter to continue: '), _ => mainMenu());
}

async function mainMenu() {
  await clear();
  await printMenu();
  readFileInterface.on('close', async _ => {
    userIOInterface.question(chalk.green(`Type an option(0..${nOptions - 1}): `), async option => {
      try {
        switch (parseInt(option)) {
          case 1:
            await dao.listByName(askForKeyToContinue);
            break;
          case 0:
            userIOInterface.write(chalk.blue("EXIT\n"));
            userIOInterface.close(err => process.exit(0));
            break;
          default:
            // Opción no existe o no implementada
            mainMenu();
        }
      } catch (e) {
        console.error(chalk.red("DATABASE ERROR: ") + e.message);
        askForKeyToContinue();
      } 
    });
  });
    
  /* 
  stdin., option => {
    */
  
}

mainMenu();