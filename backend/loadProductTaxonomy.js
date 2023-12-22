const fs = require('fs');
const readline = require('readline');
//const xml2js = require('xml2js');

// const loadProductTaxonomy = (xmlPath) => {
//     return new Promise((resolve, reject) => {
//         const file = fs.readFileSync(xmlPath, { encoding: 'utf-8' });

//         xml2js.parseString(file, (parseErr, data) => {
//             if (parseErr) {
//                 console.error('Error parsing the XML:', parseErr);
//                 reject(parseErr);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// };

const loadProductTaxonomy = (path) => {
    return new Promise((resolve, reject) => {
        try {
            const fileStream = fs.createReadStream(path, { encoding: 'utf-8' });

            const lineReader = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });

            const lines = [];

            lineReader.on('line', (line) => {
                const cleanLine = line.replace('/\n/,/g', '');
                lines.push(cleanLine);
            });

            lineReader.on('close', () => {
                resolve(lines);
            });

            lineReader.on('error', (error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = loadProductTaxonomy;
