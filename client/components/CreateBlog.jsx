
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const CreateBlogPost = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="max-w-4xl w-full p-6 sm:p-8 md:p-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a New Blog Post</CardTitle>
          <CardDescription>Fill out the form below to publish a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter a title for your blog post" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea id="introduction" rows={4} placeholder="Write a brief introduction" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" rows={8} placeholder="Write the full content of your blog post" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Publish Blog Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateBlogPost;
