import React, { useState } from "react";
import "./CommunityPage.scss";

interface Post {
  author: string;
  content: string;
  date: string;
  likes: number;
}

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      author: "Fatma B.",
      content: "J’ai adoré soutenir le projet de jardin communautaire 🌱💚 !",
      date: "24 avril 2025",
      likes: 5,
    },
    {
      author: "Omar K.",
      content: "Des idées pour aider les associations à mieux collecter des fonds ? 🔍",
      date: "23 avril 2025",
      likes: 2,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      const newEntry: Post = {
        author: "Hazem B.", // à remplacer dynamiquement plus tard
        content: newPost,
        date: new Date().toLocaleDateString(),
        likes: 0,
      };
      setPosts([newEntry, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  return (
    <div className="community-page">
      <h1>👥 Communauté</h1>
      <div className="create-post">
        <textarea
          placeholder="Exprimez une idée, partagez un projet..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePost}>Publier</button>
      </div>

      <div className="post-feed">
        {posts.map((post, index) => (
          <div className="post-card" key={index}>
            <div className="post-header">
              <span className="author">{post.author}</span>
              <span className="date">{post.date}</span>
            </div>
            <p className="content">{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(index)}>👍 {post.likes}</button>
              <button>💬 Commenter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
