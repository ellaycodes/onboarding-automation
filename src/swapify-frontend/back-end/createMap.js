import { createMapping } from "./mapping.js";
import { readFile, writeFile } from "./runAll.js";

const type = process.argv[2];
const company = process.argv[3] ?? 'force';

if (!['email', 'microsite'].includes(type))
    throw new Error("type must be either 'email' or 'microsite'");

const html = readFile(`../swapify-frontend/html/${type}/base1/template.html`);

const mapping = await createMapping(html, type);

writeFile(`../swapify-frontend/.env/${company}/${type}/json/mapping.json`, JSON.stringify(mapping, null, 2));