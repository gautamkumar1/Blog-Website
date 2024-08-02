
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6 space-y-6 text-center text-primary-foreground">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Welcome to Our Blog</h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl">
              Discover the latest insights and stories from our community of writers and experts.
            </p>
            <Link
              to="/createblog"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Create a Blog Post
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Approved Posts</h2>
                <p className="text-muted-foreground">
                  Check out the latest blog posts that have been approved by our editorial team.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Link to="#">
                        The Future of Web Development
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Explore the latest trends and technologies shaping the future of web development.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Link to="#">
                        Mastering React Hooks
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn how to leverage the power of React Hooks to build more efficient and maintainable
                      applications.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Link to="#">
                        The Rise of Serverless Computing
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Discover how serverless computing is transforming the way we build and deploy web applications.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Admin Approval Required</h2>
                <p className="text-muted-foreground">
                  All new blog posts must be approved by our editorial team before they can be published.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Submission Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To submit a new blog post, simply create an account and use our intuitive editor to draft your
                      content. Once submitted, our team will review and approve your post within 2-3 business days.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Editorial Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our editorial team reviews all submissions to ensure they meet our high standards for quality,
                      accuracy, and relevance. We prioritize well-researched, informative content that provides value to
                      our readers.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback and Revisions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      If your post is not approved, our team will provide detailed feedback and suggestions for
                      revisions. You can then update your post and resubmit it for further review.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
