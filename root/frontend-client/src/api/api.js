import axios from 'axios'
import {localHostUrl} from "../constants";


export default axios.create({
    baseURL: localHostUrl
});

