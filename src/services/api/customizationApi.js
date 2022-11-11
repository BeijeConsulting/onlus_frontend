import { getApi } from "../genericServices";

export async function getCustomization() {
    return await getApi('customization')
}