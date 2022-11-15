import { postApiNoAuth, putApi } from "../genericServices";

export async function signInApi(email, password) {
    return await postApiNoAuth('/signin', {
        "email": email,
        "password": password
    })
}

export async function signUpApi(obj) {
    return await postApiNoAuth('/user/signup', obj)
}

export async function updateUserApi(id, obj) {
    return await putApi(`/user/${id}`, obj)
}