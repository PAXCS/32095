class ContenedorFirebase {

    constructor(url) {
        this.url = url
    }

    //GetAll
    async getAll() {
        try {
            const querySnapshot = await this.url.get();
            const docs = querySnapshot.docs;
            const result = docs.map(doc => {
                return {...doc.data(), id: doc.id }
              
            });
            return result
        } catch (error) {
            console.log(error)
        }


    }
    
    //GetById
    async getById(id) {
        try {
            const doc = this.url.doc(id)
            const result = await doc.get()
            const data = result.data()
            return {...data, id}
        } catch (error) {
            console.log(error)
        }


    }

    //Create
    async insert(newDoc) {
        try {
            const doc= this.url.doc();
            const insert = await doc.create({...newDoc})
            return insert
            
        } catch (error) {
            console.log(error)
            
        }

    }

    //Update
    async actualizar(id, newDoc) {
        const doc = this.url.doc(id)
        const result = await doc.update({...newDoc});
        return result
    }

    // Delete
    async eliminar(id) {
        const doc = this.url.doc(id);
        const result = await doc.delete()
        return result

    }

}

module.exports = ContenedorFirebase