import axios from "axios"

const baseURL = 'http://localhost:4000/container'

async function listContainers(): Promise<any> {
    let response
    try {
        response = await axios.get(baseURL)
    } catch (error) {
        console.log('Error:', error)
    }
    return response ? response.data : []
}

export {
    listContainers
}