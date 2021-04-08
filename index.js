const { mainValidate, mainStats } = require("./logic");

const argv = process.argv.slice(2);
const path = argv[0];

let options = {}

if (argv[1] === '--stats' || argv[2] === '--stats' || argv[1] === '--s' || argv[2] === '--s') {
    options.stats = '--stats'
}
if (argv[1] === '--validate' || argv[2] === '--validate' || argv[1] === '--v' || argv[2] === '--v') {
    options.validate = '--validate'
}
// if (argv[2] === '--validate' && argv[3] === '--stats' || argv[2] === '--stats' && argv[3] === '--validate' || argv[2] === '--stats' && argv[3] === '--validate') {
    if (argv[2] === '--validate --stats' || argv[2] === '--stats --validate') {
    options.validate = '--validate'
    options.stats = '--stats'
}


if (options.stats === '--stats') {
    mainStats(path)
}

if (options.validate === '--validate') {
    mainValidate(path)
}

if (options.validate === '--validate' && options.stats === '--stats') {
    // ambas(path)
    mainValidate(path)
    mainStats(path)
}

// switch (argv.length) {
//     case 0:
//         console.log('Ingresa tu ruta');
//         break;
//     //  case 2:
//     //     if (argv[1] === '--stats' || argv[2] === '--stats' || argv[1] === '--s' || argv[2] === '--s') {
//     //        options.stats = '--stats'
//     //     }  if (options.stats === '--stats') {
//     //        mainStats(path)
//     //     }
//     //    break;
//     case 2:
//         if (argv[1] === '--validate' || argv[2] === '--validate' || argv[1] === '--v' || argv[2] === '--v') {
//             options.validate = '--validate'
//         } if (options.validate === '--validate') {
//             mainValidate(path)
//         }
//         break;
// }



// module.exports = () => {
//   // ...
// };
// const fs = require('fs');
// const path = require('path');
// const chalk = require('chalk');
// const fetch = require('node-fetch');

// fs.readFile('README.md', 'utf8', async (error, data) => {
//   if (error) throw error;
//   const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
//   const regex = new RegExp(expression);
//   const links = data.match(regex);
//   for (let x = 0; x < links.length; x++) {
//     links[x] = links[x].replace(/[(),"]+/g, "");
//   }
//     console.log(links);

//     const promises = links.map((link) => validateLink(link)) // esto produce un arreglo de promesas
//     Promise.all(promises) // el promise.all recibe como argumento un arreglo de promesas
//       .then(result => console.log(result)) // el resultado de cada promesas [{ state: 'OK'}, { state: 'OK'}, { state: 'OK'}, ...]
//   });

//   const validateLink = url => fetch(url)
//   .then(response => {
//     return  { status:  response.ok ? 'OK' : 'FAIL' }
//   })
//   .catch((err) => {
//     // console.log('Este link esta roto: ', err );
//     return  { status:  'FAIL' }
//   });
