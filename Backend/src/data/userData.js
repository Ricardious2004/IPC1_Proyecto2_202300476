import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');

let users = [];

const FILENAME = 'Users.json';

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(users));
} else {
    const fileData = fs.readFileSync(FILENAME, 'utf8');
    users = JSON.parse(fileData);
}


function updateDataFile() {
    fs.writeFileSync(FILENAME, JSON.stringify(users));
}


export { updateDataFile, users };