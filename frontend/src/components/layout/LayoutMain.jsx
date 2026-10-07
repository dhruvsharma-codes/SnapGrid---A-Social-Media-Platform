import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CreatePost from "../post/CreatePost.jsx";
import { useState } from "react";
const LayoutMain = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const handlePostCreated = () => {
    setShowCreatePost(false);
  };
  return (
    <div className="min-h-screen bg-(--background) text-(--text-primary)">
      <Navbar />

      <Sidebar onCreatePost={() => setShowCreatePost(true)} />

      <main className="pt-16 pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet
            context={{
              openCreatePost: () => setShowCreatePost(true),
            }}
          />
        </div>
      </main>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default LayoutMain;
