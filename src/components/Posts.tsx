// src/components/Posts.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  images: string[];
  created_at: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchInput]);

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, page]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      page: page.toString(),
      search: searchQuery,
    });

    try {
      const res = await fetch(`https://unique-furniture.infinityfreeapp.com/api/posts.php?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setTotalPages(data.pages || 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const truncateContent = (html: string) => {
    if (!html) return 'No content';
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || '';
    return text.length > 50 ? text.slice(0, 50) + '...' : text;
  };

  if (loading) return <div className="text-center py-20">Loading posts...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <section id="posts" className="py-24 bg-blue-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Unique Furniture Blogs</h2>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {searchInput && (
              <button onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto pb-6">
          <div className="flex gap-8 min-w-max">
            {posts.length === 0 ? (
              <p className="text-center text-slate-500 py-10 w-full">No posts found.</p>
            ) : (
              posts.map((post) => {
                const isExpanded = expandedIds.has(post.id);
                const shortContent = post.excerpt || truncateContent(post.content);

                return (
                  <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all w-96 flex-shrink-0">
                    {post.images[0] ? (
                      <img src={post.images[0]} alt={post.title} className="w-full h-56 object-cover" loading="lazy" />
                    ) : (
                      <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-56 flex items-center justify-center border-2 border-dashed border-gray-400">
                        <span className="text-gray-500 text-sm font-medium">No Image</span>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">{post.title}</h3>
                      <time className="text-sm text-slate-500 block mb-3">
                        {new Date(post.created_at).toLocaleDateString()}
                      </time>

                      {!isExpanded ? (
                        <p className="text-slate-600 text-sm mb-3">{shortContent}</p>
                      ) : (
                        <div className="mt-2">
                          <div className="prose prose-sm max-w-none text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
                          {post.images.length > 1 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-semibold text-slate-800 mb-2">Gallery</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {post.images.slice(1).map((img, i) => (
                                  <img key={i} src={img} alt={`Image ${i + 2}`} className="w-full h-32 object-cover rounded-lg shadow-sm" />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <button onClick={() => toggleExpand(post.id)} className="text-amber-500 hover:underline font-medium text-sm mt-3 inline-block">
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  page === i + 1 ? 'bg-amber-500 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;