'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Post } from '@/types/post';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  });

  // ===== Fetch =====
  const fetchPosts = async () => {
    try {
      const res = await api.get('/api/posts');
      setPosts(res.data);
    } catch {
      toast.error('Không tải được bài viết');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ===== Handle input =====
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== Create =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/api/posts', form);
      setForm({ title: '', content: '', author: '' });
      toast.success('Đăng bài thành công');
      fetchPosts();
    } catch {
      toast.error('Đăng bài thất bại');
    }
  };

  // ===== Delete =====
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xoá?')) return;

    try {
      await api.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Đã xoá bài viết');
    } catch {
      toast.error('Xoá thất bại');
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-slate-800">
          📚 Quản lý bài viết
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm space-y-3"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
            className="border border-slate-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Nội dung"
            className="border border-slate-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Tác giả"
            className="border border-slate-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded">
            Đăng bài
          </button>
        </form>

        {/* LIST */}
        <div className="space-y-4">
          {posts.map((p) => (
            <div
              key={p.id}
              className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm hover:bg-white hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-slate-800">
                {p.title}
              </h3>

              <p className="text-sm text-slate-500">
                ✍️ {p.author}
              </p>

              <p className="mt-2 text-slate-700 leading-relaxed">
                {p.content}
              </p>

              <button
                onClick={() => handleDelete(p.id)}
                className="mt-3 text-red-500 text-sm hover:text-red-700 transition"
              >
                Xoá
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}