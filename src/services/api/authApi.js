import { postApi, postApiNoAuth } from "../genericServices";

export async function signInApi(email, password) {
    return await postApi('/signin', {
        "email": email,
        "password": password
    })
}

export async function signUpApi(obj) {
    return await postApiNoAuth('/user/signup', obj)
}