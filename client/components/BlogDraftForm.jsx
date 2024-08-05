// src/DraftPosts.jsx
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const DraftPosts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const authToken = Cookies.get('token'); // or however you store your token
        console.log("Token: " + authToken);

        const response = await fetch("https://task-2-blog-website-1.onrender.com/api/user/draft-blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`, // Include the token here
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log("Response data: ", responseData);
        
        setDrafts(responseData);
        console.log("Status: ", drafts.status)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drafts:', error);
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
    <h1 className="text-2xl font-bold mb-4 text-center">Pending Blog Posts</h1>
    <div className="space-y-4">
      {drafts.map((draft) => (
        <div key={draft._id} className="p-4 border border-gray-600 rounded-lg bg-gray-900 text-center">
          <h2 className="text-xl font-semibold text-yellow-300">{draft.title}</h2>
          <p className="text-sm text-gray-400">Status: {draft.status}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default DraftPosts;
