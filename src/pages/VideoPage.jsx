// src/pages/VideoPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAlbumVideos } from "../services/vkApi";

export default function VideoPage() {
  const { groupId, albumId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Поскольку video.get возвращает массив, фильтруем нужное видео
    getAlbumVideos(groupId, albumId)
      .then((data) => {
        const found = (data.items || data).find(
          (v) => String(v.id) === videoId
        );
        setVideo(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [groupId, albumId, videoId]);

  if (loading) return <p>Загрузка видео...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!video) return <p>Видео не найдено.</p>;

  return (
    <div>
      <h1>{video.title || `Видео ${video.id}`}</h1>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={video.player}
          title={video.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
