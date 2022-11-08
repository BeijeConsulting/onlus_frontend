import { getApi } from "../genericServices";

export async function getPersonalDatas() {
    return await getApi('personal-area')
}