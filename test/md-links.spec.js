// const validateLink = require('../logic.js')
const { validateLinks } = require ('../logic.js');
// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

const myData = [
    {
        "href": '[http.get]',
        "text": ' ',
        "status": 'Fail'
    },
    {
        "href": 'https://nodejs.org/api/path.html',
        "text": 'Path',
        "status": 200
    },
    {
        "href": '`RegExp`',
        "text": 'expresiones regulares (`RegExp`)',
        "status": 'Fail'
    },
    {
        "href": 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        "text": 'Linea de comando CLI',
        "status": 200
    },
]

describe('validateLinks', () => {
    it('validateLinks deberia ser una funcion', () => {
        expect(typeof validateLinks).toBe('function');
    })

})