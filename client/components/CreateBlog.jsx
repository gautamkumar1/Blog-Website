/* eslint-disable no-unused-vars */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { saveDraft } from "./SaveDraft";

// const CreateBlogPost = () => {
//     const navigate = useNavigate();
//     const [createBlog, setCreateBlog] = useState({
//         title: "",
//         intro: "",
//         content: ""
//     });
//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setCreateBlog({ ...createBlog, [name]: value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             // Replace 'YOUR_AUTH_TOKEN' with the actual token
//             const authToken = Cookies.get('token') // or however you store your token
//             console.log("Token: " + authToken);
            
//             const response = await fetch("http://localhost:3000/api/user/create-blog", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${authToken}` , // Include the token here
//                     // Uncomment if needed
//                 },
//                 // credentials: 'include' ,
//                 body: JSON.stringify(createBlog),
//             });
//             const responseData = await response.json();
//             console.log("Response Data: ", responseData);
//             // Check if the response is not OK and handle the error
//             if (!response.ok) {
//                 const errorText = await response.text(); // Get the response text
//                 throw new Error(errorText);
//             }
    
//             // Parse the JSON response
            
//             toast.success("Blog Created Successfully");
//             navigate("/review-post")
//             setCreateBlog({ title: "", intro: "", content: "" });
    
//         } catch (err) {
//             // Display error message or response text
//             toast.error(err.message ? err.message : "An unexpected error occurred");
//             console.error("Blog Creation error:", err);
//         }
//     };
    
    
//     return (
//         <div className="flex justify-center items-center h-screen bg-background">
//             <Card className="max-w-4xl w-full p-6 sm:p-8 md:p-10">
//                 <CardHeader>
//                     <CardTitle className="text-3xl font-bold">Create a New Blog Post</CardTitle>
//                     <CardDescription>Fill out the form below to publish a new blog post.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form className="grid gap-6" onSubmit={handleSubmit}>
//                         <div className="grid gap-2">
//                             <Label htmlFor="title">Title</Label>
//                             <Input id="title" name="title" value={createBlog.title} onChange={handleInput} placeholder="Enter a title for your blog post" />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="introduction">Introduction</Label>
//                             <Textarea id="introduction" name="intro" value={createBlog.intro} onChange={handleInput} rows={4} placeholder="Write a brief introduction" />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="content">Content</Label>
//                             <Textarea id="content" name="content" value={createBlog.content} onChange={handleInput} rows={8} placeholder="Write the full content of your blog post" />
//                         </div>
//                         <Button type="submit">Publish Blog Post</Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };



// const CreateBlogPost = () => {
//     const navigate = useNavigate();
//     const [createBlog, setCreateBlog] = useState({
//         title: "",
//         intro: "",
//         content: ""
//     });

//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setCreateBlog({ ...createBlog, [name]: value });
//     };

//     const saveDraft = async () => {
//         try {
//             const authToken = Cookies.get('token');
//             const response = await fetch("http://localhost:3000/api/user/save-draft", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${authToken}`,
//                 },
//                 body: JSON.stringify(createBlog),
//             });
//             const responseData = await response.json();
//             if (!response.ok) {
//                 throw new Error(responseData.message || 'Failed to save draft');
//             }
//             toast.success("Draft saved successfully");
//         } catch (err) {
//             toast.error(err.message || 'An error occurred while saving draft');
//         }
//     };

//     const publishBlogPost = async () => {
//         try {
//             const authToken = Cookies.get('token');
//             const response = await fetch("http://localhost:3000/api/user/create-blog", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${authToken}`,
//                 },
//                 body: JSON.stringify(createBlog),
//             });
//             const responseData = await response.json();
//             if (!response.ok) {
//                 throw new Error(responseData.message || 'Failed to publish blog post');
//             }
//             toast.success("Blog Created Successfully");
//             navigate("/review-post");
//             setCreateBlog({ title: "", intro: "", content: "" });
//         } catch (err) {
//             toast.error(err.message || 'An unexpected error occurred');
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         saveDraft();
//         setTimeout(() => {
//             publishBlogPost();
//         }, 5000); 

//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-background">
//             <Card className="max-w-4xl w-full p-6 sm:p-8 md:p-10">
//                 <CardHeader>
//                     <CardTitle className="text-3xl font-bold">Create a New Blog Post</CardTitle>
//                     <CardDescription>Fill out the form below to publish a new blog post.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form className="grid gap-6" onSubmit={handleSubmit}>
//                         <div className="grid gap-2">
//                             <Label htmlFor="title">Title</Label>
//                             <Input id="title" name="title" value={createBlog.title} onChange={handleInput} placeholder="Enter a title for your blog post" />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="introduction">Introduction</Label>
//                             <Textarea id="introduction" name="intro" value={createBlog.intro} onChange={handleInput} rows={4} placeholder="Write a brief introduction" />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="content">Content</Label>
//                             <Textarea id="content" name="content" value={createBlog.content} onChange={handleInput} rows={8} placeholder="Write the full content of your blog post" />
//                         </div>
//                         <Button type="submit">Publish Blog Post</Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };




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
        const userId = Cookies.get('userId');
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
            const authToken = Cookies.get('token');
            const response = await fetch("http://localhost:3000/api/user/create-blog", {
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
