import axios from "axios";
const instant = axios.create({
    baseURL: 'http://localhost:3001/'
})
export default instant;