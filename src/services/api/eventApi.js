import { getApi } from "../genericServices";

export async function getEvents() {
  return await getApi("events");
}
