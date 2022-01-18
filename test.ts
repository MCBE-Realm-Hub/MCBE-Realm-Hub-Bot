import fs from 'fs';
import path from 'path';

function* crawlDir(dir: string, type?: string) {
    if(!fs.existsSync(dir)) throw new Error(`Cannot find directory ${dir}`);
    for(const content of fs.readdirSync(dir, { withFileTypes: true })) {
        if(content.isDirectory()) yield* crawlDir(path.join(dir, content.name), type);
        else if(type) content.name.endsWith(type) ? yield path.join(dir, content.name) : null;
        else yield path.join(dir, content.name);
    };
};


for(const file of crawlDir(path.join(__dirname), 'json')) {
    console.log(file);
};