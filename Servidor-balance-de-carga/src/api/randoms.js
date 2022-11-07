import { fork } from 'child_process'
import path from 'path'

/*-----------------*/

function calcularRandoms(cant) {
    const numbers = {}
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000)
        if (!numbers[ randomNumber ]) {
            numbers[ randomNumber ] = 0
        }
        numbers[ randomNumber ]++
    }
    return numbers
}

/*-----------------*/

function calcular(cant) {
    const randoms = calcularRandoms(cant)
    return Promise.resolve(randoms)
}

export { calcular }