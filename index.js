const { mainValidate, mainStats, chalk } = require('./logic');

const argv = process.argv.slice(2);
const path = argv[0];

const options = {};

if (argv[1] === '--stats' || argv[2] === '--stats' || argv[1] === '--s' || argv[2] === '--s') {
  options.stats = '--stats';
}
if (argv[1] === '--validate' || argv[2] === '--validate' || argv[1] === '--v' || argv[2] === '--v') {
  options.validate = '--validate';
}
// if (argv[2] === '--validate' && argv[3] === '--stats' || argv[2] === '--stats' && argv[3] === '--validate'|| argv[2] === '--stats' && argv[3] === '--validate') {
if (argv[2] === '--validate --stats' || argv[2] === '--stats --validate') {
  options.validate = '--validate';
  options.stats = '--stats';
}

if (options.stats === '--stats') {
  mainStats(path);
}

if (options.validate === '--validate') {
  mainValidate(path);
}

if (options.validate === '--validate' && options.stats === '--stats') {
  // ambas(path)
  mainValidate(path);
  mainStats(path);
}

// switch (path) {
//     case 0:
//         console.log('Ingresa tu ruta');
//         break;
//     //  case 2:
//     //     if (argv[1] === '--stats' || argv[2] === '--stats'
//     // || argv[1] === '--s' || argv[2] === '--s') {
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
