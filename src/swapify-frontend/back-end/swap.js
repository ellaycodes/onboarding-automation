import { copyFolder, readAndRun, readFile } from "./runAll.js";

const type = process.argv[2];
const company = process.argv[3] ?? 'force';

if (!['email', 'microsite'].includes(type))
    throw new Error("type must be either 'email' or 'microsite'");

const jsonData = readFile(`../swapify-frontend/.env/${company}/${type}/json/mapping.json`, 'utf8');
const update = JSON.parse(jsonData);

const selections = {replaceId: false, flatten: false, update};

readAndRun(`../swapify-frontend/html/${type}/base1/template.html`, `../swapify-frontend/.env/${company}/${type}/final/template.html`, selections, type);

if (type === 'email') {
    copyFolder(`../swapify-frontend/html/${type}/base1/images`, `../swapify-frontend/.env/${company}/${type}/final/images`);
}