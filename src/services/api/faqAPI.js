import { getApi } from "../genericServices";

export async function getFAQs() {
    return await getApi('faq')
}