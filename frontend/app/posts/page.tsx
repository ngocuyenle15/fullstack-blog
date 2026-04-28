'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const res = await api.get('/api/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xoá bài viết này?')) return;

    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
      toast.success('Đã xoá bài viết');
    } catch {
      toast.error('Xoá thất bại, thử lại!');
      fetchPosts();
    }
  };

  return <div>...</div>;
}