import axios from "axios"

const baseURL = 'http://localhost:4000/movement'

async function listMovements(): Promise<any> {
    let response
    try {
        response = await axios.get(baseURL)
    } catch (error) {
        console.log('Error:', error)
    }
    return response ? response.data : []
}

async function createMovement(params: any): Promise<any> {
    let response
    try {
        response = await axios.post(baseURL, params)
    } catch (error) {
        console.log('Error: ', error)
    }
    return response ? response.data : undefined
}

async function deleteMovement(params: any): Promise<any> {
    let response
    try {
        response = await axios.delete(`${baseURL}/${params.id}`)
    } catch (error) {
        console.log('Error: ', error)
    }

    return response ? response.data : undefined
}

async function updateMovement(params: any): Promise<any> {
    let response
    const newParams = {
        numberContainer: params.numberContainer,
        type: params.type,
        dateInitial: params.dateInitial,
        dateFinal: params.dateFinal

    }
    try {
        response = await axios.put(`${baseURL}/${params.id}`, newParams)
    } catch (error) {
        console.log('Error: ', error)
    }

    return response ? response.data : undefined
}

async function listMovementsByFilter(filter: any): Promise<any> {
    let response
    try {
        response = await axios.get(`${baseURL}/filter`, {
            params: filter
        })
    } catch (error) {
        console.log('Error: ', error)
    }

    return response ? response.data : []
}

export {
    listMovements,
    createMovement,
    deleteMovement,
    updateMovement,
    listMovementsByFilter
}