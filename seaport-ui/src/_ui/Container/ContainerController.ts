import axios from "axios"

const baseURL = 'http://localhost:4000/container'

class Controller {
    public async listContainersPagination(): Promise<any> {
        let response
        try {
            response = await axios.get(baseURL)
        } catch (error) {
            console.log('Error:', error)
        }
        return response ? response.data : []
    }

    public async createContainer(params: any): Promise<any> {
        let response
        try {
            response = await axios.post(baseURL, params)
        } catch (error) {
            console.log('Error: ', error)
        }

        return response ? response.data : undefined
    }

    public async deleteContainer(params: any): Promise<any> {
        let response
        try {
            response = await axios.delete(`${baseURL}/${params.id}`)
        } catch (error) {
            console.log('Error: ', error)
        }

        return response ? response.data : undefined
    }

    public async updateContainer(params: any): Promise<any> {
        let response
        const newParams = {
            client: params.client,
            numberContainer: params.numberContainer,
            type: params.type,
            status: params.status,
            category: params.category

        }
        try {
            response = await axios.put(`${baseURL}/${params.id}`, newParams)
        } catch (error) {
            console.log('Error: ', error)
        }

        return response ? response.data : undefined
    }

    public async listContainersByFilter(filter: any): Promise<any> {
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
}
const controller = new Controller()

export default controller