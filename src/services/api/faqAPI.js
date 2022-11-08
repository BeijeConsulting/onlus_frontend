import { getApi } from "../genericServices";

export async function getFAQs() {
    return await getApi('http://localhost:1337/api/faq')
}