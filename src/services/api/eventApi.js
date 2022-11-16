import { deleteApi, getApiNoAuth, postApi } from "../genericServices";

export async function getEvents() {
  return await getApiNoAuth("/event/list-events");
}

export async function bookEventApi(id) {
  return await postApi(`/event/new-attendant/${id}/0`);
}

export async function deleteAttendantApi(id) {
  return await deleteApi(`/event/delete-attendant/${id}`);
}
