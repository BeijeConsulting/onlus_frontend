import { getApi } from "../genericServices";

export async function getPersonalDatas() {
    return await getApi('http://localhost:1337/api/personal-area')
}