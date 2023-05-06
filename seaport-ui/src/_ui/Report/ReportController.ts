import axios from "axios"

const baseURL = 'http://localhost:4000'

async function listMovementsReport(): Promise<any> {
    let response
    try {
        response = await axios.get(`${baseURL}/movement/report`)
    } catch (error) {
        console.log('Error: ', error)
    }

    return response ? response.data : []
}

async function listContainersReportSump(): Promise<any> {
    let response
    try {
        response = await axios.get(`${baseURL}/container/report`)
    } catch (error) {
        console.log('Error: ', error)
    }

    return response ? response.data : []
}

export {
    listMovementsReport,
    listContainersReportSump,
}