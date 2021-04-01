const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');


// es un directorio?
const validateDirectory = (route) => {
    let directory = fs.lstatSync(route).isDirectory()
    console.log(directory);
    return directory
};

// recorro directorio
const throughDirectory = (route) => {
    let arrayLinks = [];
    if (!validateDirectory(route)) {
        arrayLinks.push(route)
    }
    else {
        let readDirectory = fs.readdirSync(route)
        readDirectory.map((read) => {
            // recorro array y uno elementos en array original
            let nextRout = path.join(route, read)
            // repito proceso
            return (validateDirectory(nextRout)) ? arrayLinks = arrayLinks.concat(throughDirectory(nextRout)) : arrayLinks.push(nextRout);
        })
    }
    console.log(arrayLinks);
    return arrayLinks
};

// es archivo md?
const filesMd = (arrLinks) => {
    let fileIsMd = []
    arrLinks.forEach(element => {
        if (path.extname(element) === '.md') {
            return fileIsMd.push(element)
        }
    });
    console.log(fileIsMd);
    return fileIsMd
}

// traer links
const extracLinks = (route) => {
    let arrayDataLinks = [];
    let arrayTotalLinks = throughDirectory(route);
    let arrayOnlyMd = filesMd(arrayTotalLinks);
    const regExpresion = /(^|[^!])\[(.*)\]\((.*)\)/g;
    const regExpressionHref = /\((.*)\)/g;
    const regExpressionNameLink = /\[((.*))\]/g;
    arrayOnlyMd.forEach(elementMd => {
        let readFileMd = fs.readFileSync(elementMd, 'utf-8');
        let listLinksMd = readFileMd.match(regExpresion) // retorna un array
        if (listLinksMd !== null) {
            listLinksMd.forEach(infoLinks => {
                let href = infoLinks.match(regExpressionHref).toString();
                let name = infoLinks.match(regExpressionNameLink).toString()
                arrayDataLinks.push({
                    file: path.resolve(elementMd),
                    href: href.split((/[\(\)]/))[1],
                    text: name.split(/[\[\]]/)[1]

                })
            })
        }
    })
    console.log(arrayDataLinks);
    return arrayDataLinks
}
extracLinks('README.md');