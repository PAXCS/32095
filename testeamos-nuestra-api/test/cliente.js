const axios = require('axios')

async function get() {
    try {
        const response= await axios.get('http://localhost:8080/api/test-api')
        return response
    } catch (err) {
        return err
    }
}

async function post(obj) {
    try {
        const response = await axios.post('http://localhost:8080/api/test-api',obj)
        return response
    } catch (err) {
        return err
    }
}

async function put(e,obj) {
    try {
        const response = await axios.put(`http://localhost:8080/api/test-api/${e}`,obj)
        return response
    } catch (err) {
        return err
    }
}

async function deleteById(e) {
    try {
        const response = await axios.delete(`http://localhost:8080/api/test-api/${e}`)
        return response
    } catch (err) {
        return err
    }
}

module.exports = {get, post, put, deleteById}