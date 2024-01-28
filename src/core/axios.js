import axios from 'axios'

const axiosIns = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default axiosIns