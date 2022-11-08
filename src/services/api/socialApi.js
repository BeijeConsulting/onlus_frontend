import { getApi } from "../genericServices";

export async function getSocial() {
  return await getApi("socials");
}
