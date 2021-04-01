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
   


//Lee un archivo
// fs.readFile('README.md', 'utf-8', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });





// //Contenido de un directorio
// fs.readdir('../CDMX010-md-links', (error, file) => {
//   if (error) {
//     onerror(error);
//     return;
//   }
//   console.log(file);
// });

// //Trae la extensión del archivo
// console.log(path.extname('README.md'));
// // console.log(path.extname('README.md').substring(1));

// //Une dos segmentos de rutas
// console.log(
//   path.format({
//     dir: '/CDMX010-md-links',
//     base: 'README.md'
//   })
// );

// //  me devuelve root, dir, base...
// let pathObj = path.parse(__filename);
// console.log(pathObj);
