import { getApiNoAuth } from "../genericServices";

export async function getEvents() {
  return await getApiNoAuth("events");
}
