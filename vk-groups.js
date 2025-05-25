export async function fetchAllGroupVideos(access_token, groups) {
  const apiBase = "https://api.vk.com/method";
  const v = "5.131";
  const allVideos = {};

  for (const grp of groups) {
    const owner = -grp.id;
    try {
      const resp = await fetch(
        `${apiBase}/video.get?access_token=${access_token}` +
          `&owner_id=${owner}&count=50&v=${v}`
      );
      const data = await resp.json();
      if (data.response) {
        allVideos[grp.id] = data.response.items;
      } else {
        console.warn(
          `Не удалось получить видео для группы ${grp.id}`,
          data.error
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  return allVideos; // { groupId1: [...videos], groupId2: [...], … }
}
