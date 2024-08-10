import { useEffect, useState } from 'react';

const ShowBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('/api/admin/approved-posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post._id}
              className="p-4 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-800 cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </div>
          ))}
        </div>
        {selectedPost && (
          <div className="mt-8 p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
            <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
            <p className="mb-2"><strong>Intro:</strong> {selectedPost.intro}</p>
            <p className="mb-4"><strong>Content:</strong> {selectedPost.content}</p>
            <p><strong>Author:</strong> {selectedPost.author.username}</p>
          </div>
        )}
      </main>
      <footer className="p-4 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2024 My Blog</p>
      </footer>
    </div>
  );
};

export default ShowBlogPosts;
