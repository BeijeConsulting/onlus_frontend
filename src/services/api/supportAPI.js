import { getApi } from "../genericServices";

export async function getSupportData() {
    return await getApi('support')
}