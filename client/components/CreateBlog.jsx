/* eslint-disable no-unused-vars */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { saveDraft } from "./SaveDraft";





const CreateBlogPost = () => {
    const navigate = useNavigate();
    const [createBlog, setCreateBlog] = useState({
        title: "",
        intro: "",
        content: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCreateBlog({ ...createBlog, [name]: value });
    };

    const handleSaveDraft = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('User ID is not available');
            return;
        }

        const draftData = {
            ...createBlog,
            userId: userId
        };

        try {
            await saveDraft(draftData);
        } catch (err) {
            console.error("Failed to save draft:", err); // Debug log
        }
    };

    const publishBlogPost = async () => {
        try {
            const authToken = localStorage.getItem('token');
            console.log("Auth token: " + authToken);
            
            const response = await fetch("/api/user/create-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(createBlog),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to publish blog post');
            }
            toast.success("Blog Created Successfully");
            navigate("/review-post");
            setCreateBlog({ title: "", intro: "", content: "" });
        } catch (err) {
            console.error("Error publishing blog post:", err); // Debug log
            toast.error(err.message || 'An unexpected error occurred');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        publishBlogPost(); // Handle publishing only
    };

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <Card className="max-w-4xl w-full p-6 sm:p-8 md:p-10">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Create a New Blog Post</CardTitle>
                    <CardDescription>Fill out the form below to publish a new blog post.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={createBlog.title} onChange={handleInput} placeholder="Enter a title for your blog post" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="introduction">Introduction</Label>
                            <Textarea id="introduction" name="intro" value={createBlog.intro} onChange={handleInput} rows={4} placeholder="Write a brief introduction" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" value={createBlog.content} onChange={handleInput} rows={8} placeholder="Write the full content of your blog post" />
                        </div>
                        <div className="flex gap-4">
                            <Button type="button" onClick={handleSaveDraft}>Save Draft</Button>
                            <Button type="submit">Publish Blog Post</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};




export default CreateBlogPost;
