import { postApi } from "../genericServices";

export async function signInApi(email, password) {
    return await postApi('/signin', {
        "email": email,
        "password": password
    })
}