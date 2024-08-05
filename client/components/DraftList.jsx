/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DraftsList = () => {
    const [drafts, setDrafts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDraft, setCurrentDraft] = useState(null);
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrafts = async () => {
            if (!userId) {
                toast.error('User ID is not available');
                return;
            }

            try {
                const authToken = Cookies.get('token');
                const response = await fetch(`http://localhost:3000/api/user/get-drafts/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch drafts');
                const draftsData = await response.json();
                setDrafts(draftsData);
            } catch (err) {
                toast.error(err.message || 'Failed to load drafts');
            }
        };

        fetchDrafts();
    }, [userId]);

    const handleEditClick = (draft) => {
        setCurrentDraft(draft);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentDraft(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const authToken = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/api/user/create-blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(currentDraft),
            });

            if (!response.ok) throw new Error('Failed to create blog');

            const newBlog = await response.json();
            setDrafts((prevDrafts) =>
                prevDrafts.filter((draft) => draft._id !== currentDraft._id)
            );
            toast.success('Blog created successfully');
            navigate("/review-post");
            handleModalClose();
        } catch (err) {
            toast.error(err.message || 'Failed to create blog');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDraft((prevDraft) => ({ ...prevDraft, [name]: value }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">Your Drafts</h2>
                <ul className="space-y-4">
                    {drafts.map(draft => (
                        <li key={draft._id} className="border border-gray-700 p-4 rounded-lg shadow-sm bg-gray-700">
                            <h3 className="text-xl font-semibold text-white">{draft.title}</h3>
                            <p className="mt-2 text-gray-300">{draft.intro}</p>
                            <button 
                                onClick={() => handleEditClick(draft)}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white">Edit Draft</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Title</label>
                                <input 
                                    type="text"
                                    name="title"
                                    value={currentDraft.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Intro</label>
                                <input 
                                    type="text"
                                    name="intro"
                                    value={currentDraft.intro}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Content</label>
                                <textarea 
                                    name="content"
                                    value={currentDraft.content}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button 
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DraftsList;
