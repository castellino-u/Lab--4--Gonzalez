
const fs = require('fs');
const readline = require('readline');
const yargs = require('yargs');


const argv = yargs.option('file', {
    alias: 'f',
    describe: 'Nombre del archivo JSON',
    default: 'productos.json',
    type: 'string',
}).argv;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const preguntar = (pregunta) => {
    return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
        resolve(respuesta);
    });
    });
};


/**
 * esta es la función principal donde vamos a pedir datos al usuario
 */
async function main() {
    try {
    
    const nombre = await preguntar('Producto: ');
    const precio = parseFloat(await preguntar('Precio: '));
    const cantidad = parseInt(await preguntar('Cantidad: '));

    const producto = { nombre, precio, cantidad };
    const archivo = argv.file;

    let productos = [];
    if (fs.existsSync(archivo)) {
        const data = fs.readFileSync(archivo, 'utf8');
        productos = JSON.parse(data);
    }

    productos.push(producto);
    fs.writeFileSync(archivo, JSON.stringify(productos, null, 2));
    console.log('Producto guardado correctamente.');

    const contenido = fs.readFileSync(archivo, 'utf8');
    console.log('Contenido del archivo:', contenido);
    } catch (error) {
    console.error('Error:', error.message);
    } finally {
    rl.close();
    }
}

main();

