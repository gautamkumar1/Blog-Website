import { Link } from "react-router-dom";
import { AuthContext } from "../src/store/auth-context";
import { useContext, useEffect, useState } from "react";

function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        console.log(isLoggedIn, "YUGH");
    }, [isLoggedIn]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link className="block text-teal-600 dark:text-teal-600" to="/">
                            <span className="sr-only">Home</span>
                            <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG path remains the same */}
                            </svg>
                        </Link>
                    </div>

                    <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} absolute md:static bg-white dark:bg-gray-900 left-0 right-0 top-16 md:top-0 z-20`}>
                        <ul className="flex flex-col md:flex-row items-center gap-6 text-sm p-4 md:p-0">
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/">Home</Link></li>
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/createblog">Create Blog</Link></li>
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/pendingblogs">Pending Blogs</Link></li>
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/draftblogs">Draft Blogs</Link></li>
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/blogs">Blogs</Link></li>
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/about">About</Link></li>
                            <li><Link className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/contact">Contact Us</Link></li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            {isLoggedIn ? (
                                <Link to="/logout" className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-red-500">
                                    Logout
                                </Link>
                            ) : (
                                <>
                                    <Link className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500" to="/login">
                                        Login
                                    </Link>
                                    <Link className="hidden sm:inline-block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75" to="/register">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            className="md:hidden rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;