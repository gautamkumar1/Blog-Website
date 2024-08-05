/* eslint-disable react/jsx-no-undef */
import { Link } from 'react-router-dom';

function ReviewPosts() {
    
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Post is Under Review
          </h1>
          <p className="mt-4 text-muted-foreground">
          After reviewing the post, it can be made public. You can now view your draft post.
        </p>
          <div className="mt-6">
            <Link
              to="/draftblogs"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Check Your Draft Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }
  

export default ReviewPosts