import { getToken } from "./auth";

const API_BASE = "https://api.vk.com/method";
const API_VER = "5.131";

async function call(method, params = {}) {
  const { access_token, user_id } = getToken();
  const qs = new URLSearchParams({
    access_token,
    user_id,
    v: API_VER,
    ...params,
  });
  const res = await fetch(`${API_BASE}/${method}?${qs}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.error_msg);
  return json.response;
}

export function getUserGroups() {
  return call("groups.get", { extended: 1, count: 1000 });
}

export function getGroupAlbums(groupId) {
  return call("video.getAlbums", { owner_id: -groupId });
}

export function getAlbumVideos(groupId, albumId) {
  return call("video.get", { owner_id: -groupId, album_id: albumId });
}
