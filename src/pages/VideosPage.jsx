// src/pages/VideosPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAlbumVideos } from "../services/vkApi";

export default function VideosPage() {
  const { groupId, albumId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAlbumVideos(groupId, albumId)
      .then((data) => {
        setVideos(data.items || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [groupId, albumId]);

  if (loading) return <p>Загрузка видео...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Видео альбома {albumId}</h1>
      <ul>
        {videos.map((v) => (
          <li key={v.id}>
            <Link to={`/groups/${groupId}/albums/${albumId}/videos/${v.id}`}>
              {v.title || `Видео ${v.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
