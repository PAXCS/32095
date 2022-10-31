const random = (cant) => {
    let arrayNumber = []
    let objetNumber = {}
    
    for (var i=0; i <= cant; i++) {
        arrayNumber.push(Math.floor(Math.random()*1000+1))
    }

    for (const n of arrayNumber) {
        objetNumber[n]
            ? objetNumber[n]++
            : objetNumber[n] = 1
    }

    return objetNumber
}

process.on('message', (cant) => {
    const respuesta = random(cant)
    process.send(respuesta)
})