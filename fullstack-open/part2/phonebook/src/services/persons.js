import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = ({name, number}) => {
    const request = axios.post(baseUrl, {name, number})
    return request.then(response => response.data)
}

export default { getAll, create}