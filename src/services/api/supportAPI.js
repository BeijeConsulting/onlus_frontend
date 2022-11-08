import { getApi } from "../genericServices";

export async function getSupportData() {
    return await getApi('http://localhost:1337/api/support')
}