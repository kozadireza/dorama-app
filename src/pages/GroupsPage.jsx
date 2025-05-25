// src/pages/GroupsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserGroups } from "../services/vkApi";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserGroups()
      .then((data) => {
        setGroups(data.items || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка групп...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Ваши группы</h1>
      <ul>
        {groups.map((g) => (
          <li key={g.id}>
            <Link to={`/groups/${g.id}/albums`}>{g.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
