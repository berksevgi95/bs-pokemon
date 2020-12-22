import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    // headers: {
    //     Authorization: `Bearer ${process.env.APP_TOKEN}`
    // },
})

export default axiosInstance;