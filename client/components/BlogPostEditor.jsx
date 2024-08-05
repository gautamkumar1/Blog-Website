
import { useEffect, useState } from 'react';
import { useSocket } from '../src/useSocket';

const BlogPostEditor = () => {
    const [content, setContent] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const socket = useSocket('ws://localhost:3000');

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPublished) {
                saveDraft(content);
            }
        }, 5000); // Save draft every 5 seconds
        return () => clearInterval(interval);
    }, [content, isPublished]);

    const saveDraft = (content) => {
        if (socket) {
            socket.send(JSON.stringify({ type: 'SAVE_DRAFT', content }));
        }
    };

    const handlePublish = () => {
        setIsPublished(true);
        // Handle publish logic here
    };

    return (
        <div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handlePublish}>Publish</button>
        </div>
    );
};

export default BlogPostEditor;
