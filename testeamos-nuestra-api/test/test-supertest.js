const request = require('supertest')
const req = request('http://localhost:8080/api/test-api')
let arraySize

describe('Test SUPERTEST', () => {
    it('GET: Obtiene todos los productos. RETORNO: Status 200; array', (done) => {
        req.get("/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done)
    })

    it('POST: Producto nuevo. RETORNO: status 200', (done) => {
        req.post("/")
        .send({"cod":"001", "nombre": "Heladera","precio": "180000", "foto": "https://http2.mlstatic.com/D_NQ_NP_2X_734540-MLA44628265442_012021-F.webp"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(function(res){
            arraySize = parseInt(res.body.id)
        })
        .expect(200, done)
    })

    it('PUT: Produto por su ID. RETORNO: status 200; objeto con respuesta exitosa', (done) => {
        req.put(`/${arraySize}`)
        .send({"cod":"002", "nombre": "Heladera","precio": "150000", "foto": "https://http2.mlstatic.com/D_NQ_NP_2X_686897-MLA32557197254_102019-F.webp"})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect({ respuesta: 'Info correctamente actualizada' })
        .end((err) => {
            if (err) return done(err)
            done()
        })
    })

    it('DELETE: Elimina producto por su ID, RETORNO: status 200; un objeto con respuesta exitosa', (done) => {
        req.delete(`/${arraySize}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({ respuesta: 'Producto eliminado correctamente' }, done)
    })

})