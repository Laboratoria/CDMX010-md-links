const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');


// convertir a ruta
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
  const directory = fs.lstatSync(route).isDirectory();
  // console.log(directory);
  return directory;
};
// validateDirectory('coverage')

// recorro directorio
const throughDirectory = (route) => {
  let arrayDirectoryLinks = [];
  if (!validateDirectory(route)) {
    arrayDirectoryLinks.push(route);
  } else {
    const readDirectory = fs.readdirSync(route);
    readDirectory.map((read) => { // read elemento que estoy procesando
      const nextRout = path.join(route, read); // recorro arr, uno y separo elementos en array orig
      // repito proceso
      return (validateDirectory(nextRout))
        ? arrayDirectoryLinks = arrayDirectoryLinks.concat(throughDirectory(nextRout)) : arrayDirectoryLinks.push(nextRout);
    });
  }
  // console.log(arrayDirectoryLinks);
  return arrayDirectoryLinks;
};
// throughDirectory('coverage')

// es archivo md?
const filesMd = (arrayLinks) => {
  const fileIsMd = [];
  arrayLinks.forEach((element) => {
    if (path.extname(element) === '.md') {
      return fileIsMd.push(element);
    }
  });
  return fileIsMd;
};

// traer links
const extracLinks = (route) => {
  const arrayDataLinks = [];
  const arrayTotalLinks = throughDirectory(route);
  const arrayOnlyMd = filesMd(arrayTotalLinks);
  const regExpresion = /(^|[^!])\[(.*)\]\((.*)\)/g;
  const regExpressionHref = /\((.*)\)/g;
  const regExpressionNameLink = /\[((.*))\]/g;
  arrayOnlyMd.forEach((elementMd) => {
    const readFileMd = fs.readFileSync(elementMd, 'utf-8');
    const listLinksMd = readFileMd.match(regExpresion); // retorna un array
    if (listLinksMd !== null) {
      listLinksMd.forEach((infoLinks) => {
        const href = infoLinks.match(regExpressionHref).toString();
        if (href.charAt(1) !== '#') {
          const name = infoLinks.match(regExpressionNameLink).toString();
          arrayDataLinks.push({
            // file: path.resolve(elementMd),
            href: href.split((/[\(\)]/))[1], 
            text: name.split(/[\[\]]/)[1],
          });
        }
      });
    }
  });  
  return arrayDataLinks;
};
// console.log(extracLinks('README.md'));


// traer status y message de cada link
const validateLinks = (objectLinks) => {
  const arrayPromises = objectLinks.map((linksValidate) => new Promise((resolve) => // produce arr promesas
    // valida la propiedad href que esta dentro de mi array de objeto
    fetch(linksValidate.href) // objeto con propiedades de respuesta de la peticion
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
      })));
  return Promise.all(arrayPromises); // promise.all recibe como argumento un arreglo de promesas
};
// console.log(validateLinks(extracLinks('README.md')));

// traer total de links
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
  });
  console.log(chalk.blue(`Total de links:`), chalk.blueBright(`${totalLinks}`));
  console.log(chalk.green(`Links válidos:`), chalk.greenBright(`${counterOk}`));
  console.log(chalk.red(`Links rotos:`), chalk.redBright(`${counterFail}`));
};



const mainValidate = (path) => {
  const objetoLinks = extracLinks(path);
  validateLinks(objetoLinks)
    .then((result) => {
      console.log(result);
    });
};
// mainValidate('README.md');

const mainStats = (path) => {
  const objetoLinks = extracLinks(path);
  validateLinks(objetoLinks)
    .then((result) => {
      console.log(getStatsLinks(result));
    });
};
// mainStats('README.md');

// const ambas = (path) => {
//     const objetoLinks = extracLinks(path)
//     validateLinks(objetoLinks)
//         .then(result => {
//             console.log(result)
//             getStatsLinks(result)
//         })
// };

module.exports = {
  validateDirectory,
  throughDirectory,
  filesMd,
  extracLinks,
  validateLinks,
  getStatsLinks,
  mainValidate,
  mainStats,
  chalk
  // ambas

};
