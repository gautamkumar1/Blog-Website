/* eslint-disable no-unused-vars */

const About = () => {
  return (
    <div className="bg-background text-foreground">
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Our Blog
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Explore a world of insights and inspiration through our carefully curated content.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">About the Author</h2>
            <div className="flex items-center space-x-4">
              {/* <img src="/placeholder.svg" alt="Author Avatar" width={80} height={80} className="rounded-full" /> */}
              <div>
                <p className="font-medium">Gautam Kumar</p>
                <p className="text-muted-foreground">Admin of This Blog Website</p>
              </div>
            </div>
            <p className="text-muted-foreground md:text-xl">
              John Doe is a seasoned writer and blogger with a deep passion for sharing thought-provoking ideas and
              inspiring stories. With years of experience in the industry, he brings a unique perspective to every piece
              he crafts.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-muted py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">About Our Blog</h2>
              <p className="text-muted-foreground md:text-xl">
                Our blog is a curated space where we share a diverse range of content, from thought-provoking essays and
                in-depth analyses to inspiring personal stories and practical guides. Our mission is to provide our
                readers with a platform to explore new ideas, gain valuable insights, and find the inspiration they need
                to navigate their personal and professional lives.
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">What to Expect</h2>
              <ul className="space-y-2 text-muted-foreground md:text-xl">
                <li>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    <span>Engaging and informative articles on a wide range of topics</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    <span>Thought-provoking essays that challenge the status quo</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    <span>Inspiring personal stories and interviews</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    <span>Practical guides and tips to help you grow and succeed</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default About;
