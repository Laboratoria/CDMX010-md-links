const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

//convertir a ruta
// const gettingAbsolutePath = (routes) => {
//     if (path.isAbsolute(routes) === false) {  // si es realtiva
//         const absoluteRoute = path.resolve(routes); // que lo convierta a absoluta
//         return absoluteRoute;
//     }
//     else if (path.isAbsolute(routes) === true) { //si es absoluta
//       return routes
//     }
//   } 
//   console.log('Tu ruta absoluta es : ' + gettingAbsolutePath('README.md'));

// es un directorio?
const validateDirectory = (route) => {
    let directory = fs.lstatSync(route).isDirectory() //devuevlo valores booleanos
    // console.log('¿Tu ruta es un directorio? ' + directory);
    return directory
};

// recorro directorio
const throughDirectory = (route) => {
    let arrayDirectoryLinks = [];
    if (!validateDirectory(route)) {
        arrayDirectoryLinks.push(route)
    }
    else {
        let readDirectory = fs.readdirSync(route)
        readDirectory.map((read) => { //read elemento que estoy procesando
            let nextRout = path.join(route, read) // recorro array, uno elementos y separo en array original
            // repito proceso
            return (validateDirectory(nextRout)) ? arrayDirectoryLinks = arrayDirectoryLinks.concat(throughDirectory(nextRout)) : arrayDirectoryLinks.push(nextRout);
        })
    }
    // console.log(arrayDirectoryLinks);
    return arrayDirectoryLinks
};

// es archivo md?
const filesMd = (arrayLinks) => {
    let fileIsMd = []
    arrayLinks.forEach(element => {
        if (path.extname(element) === '.md') {
            return fileIsMd.push(element)
        }
    });
    // console.log('Tu(s) archivo es: ' + fileIsMd);
    return fileIsMd
};

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
                if (href.charAt(1) !== '#') {
                    let name = infoLinks.match(regExpressionNameLink).toString()
                arrayDataLinks.push({
                    // file: path.resolve(elementMd),
                    href: href.split((/[\(\)]/))[1],
                    text: name.split(/[\[\]]/)[1]
                })
                } 
            })
        }
    })
    return arrayDataLinks
}
// extracLinks('README.md');


//traer status y message de cada link
const validateLinks = (objectLinks) => {
    let arrayPromises = objectLinks.map((linksValidate) => new Promise((resolve) => { // esto produce un arreglo de promesas
        // valida la propiedad href que esta dentro de mi array de objeto
        return fetch(linksValidate.href) // objeto con propiedades de respuesta de la peticion       
            .then((response) => {
                if (response.status >= 200 && response.status < 400) {
                    linksValidate.status = response.status;
                    // linksValidate.message = response.statusText;
                    resolve(linksValidate); // retorno mi objeto
                }
            })
            .catch(() => {
                linksValidate.status = 'Fail';
                // linksValidate.message = 'No existe';
                resolve(linksValidate);
            })
    })
    )
    return Promise.all(arrayPromises) // promise.all recibe como argumento un arreglo de promesas
}


//traer total de links 
const getStatsLinks = (validatedLinks) => {
    const totalLinks = validatedLinks.length;
    let counterOk = 0;
    let counterFail = 0;
    validatedLinks.map((validatedLink) => {
        if (validatedLink.status >= 200 && validatedLink.status < 400) {
            counterOk++;
        } else {
            counterFail++;
        }
    })
    console.log('Total de links: ' + totalLinks);
    console.log('Links válidos: ' + counterOk);
    console.log('Links rotos: ' + counterFail);

};


const mainValidate = (path) => {
    const objetoLinks = extracLinks(path)
    validateLinks(objetoLinks)
        .then(result => {
            console.log(result)
        })
};
// main('README.md');

const mainStats = (path) => {
    const objetoLinks = extracLinks(path)
    validateLinks(objetoLinks)
        .then(result => {
            console.log(getStatsLinks(result));
        })
};

// const ambas = (path) => {
//     const objetoLinks = extracLinks(path)
//     validateLinks(objetoLinks)
//         .then(result => {
//             console.log(result)
//             getStatsLinks(result)
//         })
// };

module.exports = {
    mainValidate,
    mainStats,
    validateLinks
    // ambas

};