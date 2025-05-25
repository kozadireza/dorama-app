// src/pages/AlbumsPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupAlbums } from "../services/vkApi";

export default function AlbumsPage() {
  const { groupId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGroupAlbums(groupId)
      .then((data) => {
        setAlbums(data.items || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [groupId]);

  if (loading) return <p>Загрузка альбомов...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Альбомы группы {groupId}</h1>
      <ul>
        {albums.map((alb) => (
          <li key={alb.id}>
            <Link to={`/groups/${groupId}/albums/${alb.id}/videos`}>
              {alb.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
