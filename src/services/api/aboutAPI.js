import { getApi } from "../genericServices";

export async function getAbout() {
    return await getApi('http://localhost:1337/api/about')
}