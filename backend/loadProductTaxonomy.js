const fs = require('fs');
const xml2js = require('xml2js');

const loadProductTaxonomy = (xmlPath) => {
    return new Promise((resolve, reject) => {
        const file = fs.readFileSync(xmlPath, { encoding: 'utf-8' });

        xml2js.parseString(file, (parseErr, data) => {
            if (parseErr) {
                console.error('Error parsing the XML:', parseErr);
                reject(parseErr);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = loadProductTaxonomy;
