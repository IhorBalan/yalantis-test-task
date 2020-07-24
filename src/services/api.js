import axios from "axios";

export function getUsers() {
    return axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users');
}