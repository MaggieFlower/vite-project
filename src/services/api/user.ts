import service from '../axios.ts';
interface Params{
    phone: number,
    password: string
}
const userApi = {
    login: '/login/cellphone/',
    logout: '/logout'
}
export function login(params:Params) {
    return service.post(
        userApi.login,
        {
            timestamp: new Date().getTime(),
            ...params
        },
    )
}
export function logout() {
    return service.post(
        userApi.logout,
        {
            timestamp: new Date().getTime(),
        }
    )
}