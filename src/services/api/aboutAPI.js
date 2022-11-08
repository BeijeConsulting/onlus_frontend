import { getApi } from "../genericServices";

export async function getAbout() {
    return await getApi('about')
}