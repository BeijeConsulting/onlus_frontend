import { getApi } from "../genericServices";

export async function getHome() {
  return await getApi("home");
}
