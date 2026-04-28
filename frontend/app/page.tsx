'use client';

import { useState, useEffect } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setAuthor('');
      fetchPosts(); // refresh danh sách
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung"
        />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tác giả"
        />

        <button type="submit">Đăng bài</button>
      </form>

      {posts.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>
            {p.author} — {p.content}
          </p>
        </div>
      ))}
    </div>
  );
}