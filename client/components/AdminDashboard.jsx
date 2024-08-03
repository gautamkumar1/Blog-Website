/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Badge } from "../components/ui/badge";

function BookIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function LayoutGridIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const AdminDashboard = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-[260px_1fr]">
      <aside className="flex flex-col border-r bg-background">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <BookIcon className="h-6 w-6" />
            <span>Blog Admin</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground" prefetch={false}>
            <LayoutGridIcon className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground" prefetch={false}>
            <FilePenIcon className="h-4 w-4" />
            Posts
          </Link>
          <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground" prefetch={false}>
            <MessageCircleIcon className="h-4 w-4" />
            Comments
          </Link>
          <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground" prefetch={false}>
            <UsersIcon className="h-4 w-4" />
            Users
          </Link>
          <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground" prefetch={false}>
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex flex-1 flex-col space-y-4 p-8">
        <header className="flex items-center">
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold tracking-wide">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your blog posts</p>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/" target="_blank" rel="noopener noreferrer">View your site</Link>
            </Button>
            
          </div>
        </header>
        <Card className="mt-8">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>A summary of your published posts.</CardDescription>
            </div>
            <Button asChild>
              <Link href="#" className="text-sm">New Post</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link href="#" className="font-medium">Understanding Promises in JavaScript</Link>
                  </TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>July 24, 2024</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>
                    <Badge>Published</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link href="#" className="font-medium">A Guide to React Context API</Link>
                  </TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>August 2, 2024</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    <Badge>Published</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link href="#" className="font-medium">CSS Grid vs. Flexbox</Link>
                  </TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>August 1, 2024</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    <Badge>Published</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
export default AdminDashboard;