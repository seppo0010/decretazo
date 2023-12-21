const fs = require('fs');

const text = fs.readFileSync('./texto.txt', { encoding: 'utf-8' })
const titulos = text.split(/^Título/mg)
for (const titulo of titulos) {
    const lines = titulo.split('\n')
    const name = `Título${lines[0]}`
    const text = lines.slice(1).join('\n')
    console.log(name)
}