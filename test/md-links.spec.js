/* eslint-disable no-undef */
const { validateDirectory, throughDirectory, filesMd, extracLinks, validateLinks, getStatsLinks, mainValidate, mainStats } = require('../logic.js');
// const mdLinks = require('../');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const route = 'README.md'

const myData = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown'
  },
  { href: 'https://nodejs.org/', text: 'Node.js'},
  { href: 'https://nodejs.org/es/', text: 'Node.js'},
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
  },
  { href: '[`import`]', text: ' '},
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export',
    text: '`export`',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: ' ',
  },
  {
    href: 'https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises',
    text: ' ',
  },
  {
    href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
    text: ' ',
  },
  { href: '[fs]', text: ' '},
  { href: '[npm]', text: ' '},
  { href: 'CommonJS', text: ' '},
  {
    href: 'https://docs.npmjs.com/files/package.json',
    text: ' '
  },
  {
    href: 'https://docs.npmjs.com/misc/scripts',
    text: ' '
  },
  {
    href: 'https://jestjs.io/docs/es-ES/getting-started',
    text: ' '
  },
  {
    href: 'https://jestjs.io/docs/es-ES/asynchronous',
    text: ' '
  },
  {
    href: 'https://jestjs.io/docs/es-ES/manual-mocks',
    text: ' '
  },
  { href: '[http.get]', text: ' '},
  {
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
    text: ' '
  },
  { href: 'https://jestjs.io/', text: 'Jest'},
  {
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá',
  },
  {
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`'
  },
  {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it'
  },
  {
    href: '`RegExp`',
    text: 'expresiones regulares (`RegExp`)'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked'
  },
  {
    href: 'https://github.com/jsdom/jsdom',
    text: 'JSDOM'
  },
  {
    href: 'https://github.com/cheeriojs/cheerio',
    text: 'Cheerio'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked'
  },
  {
    href: 'http://community.laboratoria.la/c/js',
    text: 'foro de la comunidad'
  },
  {
    href: 'https://github.com/workshopper/learnyounode',
    text: 'learnyounode'
  },
  {
    href: 'https://github.com/workshopper/how-to-npm',
    text: 'how-to-npm'
  },
  {
    href: 'https://github.com/stevekane/promise-it-wont-hurt',
    text: 'promise-it-wont-hurt'
  },
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Acerca de Node.js - Documentación oficial'
  },
  {
    href: 'https://nodejs.org/api/fs.html',
    text: 'Node.js file system - Documentación oficial'
  },
  {
    href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
    text: 'Node.js http.get - Documentación oficial'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Node.js',
    text: 'Node.js - Wikipedia'
  },
  {
    href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
    text: 'What exactly is Node.js? - freeCodeCamp'
  },
  {
    href: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
    text: '¿Qué es Node.js y para qué sirve? - drauta.com'
  },
  {
    href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
    text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube'
  },
  {
    href: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
    text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011'
  },
  {
    href: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
    text: 'Node.js y npm'
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?'
  },
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Crear módulos en Node.js'
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Leer un archivo'
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Leer un directorio'
  },
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'Path'
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI'
  },
  {
    href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
    text: 'recurso'
  }
]

const result = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    status: 200
  },
  { href: 'https://nodejs.org/', text: 'Node.js', status: 200 },
  { href: 'https://nodejs.org/es/', text: 'Node.js', status: 200 },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    status: 200
  },
  { href: '[`import`]', text: ' ', status: 'Fail' },
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export',
    text: '`export`',
    status: 200
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: ' ',
    status: 200
  },
  {
    href: 'https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises',
    text: ' ',
    status: 200
  },
  {
    href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
    text: ' ',
    status: 200
  },
  { href: '[fs]', text: ' ', status: 'Fail' },
  { href: '[npm]', text: ' ', status: 'Fail' },
  { href: 'CommonJS', text: ' ', status: 'Fail' },
  {
    href: 'https://docs.npmjs.com/files/package.json',
    text: ' ',
    status: 200
  },
  {
    href: 'https://docs.npmjs.com/misc/scripts',
    text: ' ',
    status: 200
  },
  {
    href: 'https://jestjs.io/docs/es-ES/getting-started',
    text: ' ',
    status: 200
  },
  {
    href: 'https://jestjs.io/docs/es-ES/asynchronous',
    text: ' ',
    status: 200
  },
  {
    href: 'https://jestjs.io/docs/es-ES/manual-mocks',
    text: ' ',
    status: 200
  },
  { href: '[http.get]', text: ' ', status: 'Fail' },
  {
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
    text: ' ',
    status: 200
  },
  { href: 'https://jestjs.io/', text: 'Jest', status: 200 },
  {
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá',
    status: 200
  },
  {
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`',
    status: 200
  },
  {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    status: 200
  },
  {
    href: '`RegExp`',
    text: 'expresiones regulares (`RegExp`)',
    status: 'Fail'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    status: 200
  },
  {
    href: 'https://github.com/jsdom/jsdom',
    text: 'JSDOM',
    status: 200
  },
  {
    href: 'https://github.com/cheeriojs/cheerio',
    text: 'Cheerio',
    status: 200
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    status: 200
  },
  {
    href: 'http://community.laboratoria.la/c/js',
    text: 'foro de la comunidad',
    status: 200
  },
  {
    href: 'https://github.com/workshopper/learnyounode',
    text: 'learnyounode',
    status: 200
  },
  {
    href: 'https://github.com/workshopper/how-to-npm',
    text: 'how-to-npm',
    status: 200
  },
  {
    href: 'https://github.com/stevekane/promise-it-wont-hurt',
    text: 'promise-it-wont-hurt',
    status: 200
  },
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Acerca de Node.js - Documentación oficial',
    status: 200
  },
  {
    href: 'https://nodejs.org/api/fs.html',
    text: 'Node.js file system - Documentación oficial',
    status: 200
  },
  {
    href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
    text: 'Node.js http.get - Documentación oficial',
    status: 200
  },
  {
    href: 'https://es.wikipedia.org/wiki/Node.js',
    text: 'Node.js - Wikipedia',
    status: 200
  },
  {
    href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
    text: 'What exactly is Node.js? - freeCodeCamp',
    status: 200
  },
  {
    href: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
    text: '¿Qué es Node.js y para qué sirve? - drauta.com',
    status: 200
  },
  {
    href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
    text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
    status: 200
  },
  {
    href: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
    text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011',
    status: 200
  },
  {
    href: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
    text: 'Node.js y npm',
    status: 200
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    status: 200
  },
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    status: 200
  },
  {
    href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    status: 200
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    status: 200
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Crear módulos en Node.js',
    status: 200
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Leer un archivo',
    status: 200
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Leer un directorio',
    status: 200
  },
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'Path',
    status: 200
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    status: 200
  },
  {
    href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
    text: 'recurso',
    status: 200
  }
]



describe('validateDirectory', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof validateDirectory).toBe('function');
  });
});

describe('throughDirectory', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof throughDirectory).toBe('function');
  });
});

describe('filesMd', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof filesMd).toBe('function');
  });
});

describe('extracLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof extracLinks).toBe('function');
  });
  it('Debería retornar un arreglo de objetos con href y text', () => {
    expect(extracLinks(route)).toEqual(expect.arrayContaining(myData));
  });
});

describe('validateLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar un arreglo de objetos que agrega status', (done) => {
    validateLinks(myData)
      .then((expected) => {
        expect(result).toEqual(expect.arrayContaining(expected));
        done();
      });
  });
});

describe('getStatsLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof getStatsLinks).toBe('function');
  });
  it('Deberia retornar un contador de total de links, links válidos y links rotos', () => {
    expect(getStatsLinks(result)).toEqual();
  });

});

describe('mainValidate', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof mainValidate).toBe('function');
  });
});

describe('mainStats', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof mainStats).toBe('function');
  });
});