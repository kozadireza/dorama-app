import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { isLoggedIn } from "./services/auth";
import LoginPage from "./pages/LoginPage";
import GroupsPage from "./pages/GroupsPage";
import AlbumsPage from "./pages/AlbumsPage";
import VideosPage from "./pages/VideosPage";
import VideoPage from "./pages/VideoPage";

export default function App() {
  const auth = isLoggedIn();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/groups"
          element={auth ? <GroupsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/groups/:groupId/albums"
          element={auth ? <AlbumsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/groups/:groupId/albums/:albumId/videos"
          element={auth ? <VideosPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/groups/:groupId/albums/:albumId/videos/:videoId"
          element={auth ? <VideoPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={auth ? "/groups" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}
