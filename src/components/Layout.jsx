import React from 'react';
import { ChefHat, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? "text-orange-500 font-bold" : "text-gray-600 hover:text-orange-500";

    return (
        <div className="min-h-screen bg-orange-50 font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">SnapChef</h1>
                    </Link>

                    {user ? (
                        <nav className="flex items-center gap-6">
                            <ul className="flex space-x-6 text-sm md:text-base">
                                <li className={isActive("/")}><Link to="/">Dashboard</Link></li>
                                <li className={isActive("/history")}><Link to="/history">History</Link></li>
                                <li className={isActive("/favorites")}><Link to="/favorites">Favorites</Link></li>
                            </ul>
                            <div className="h-6 w-px bg-gray-200"></div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="bg-orange-100 p-1 rounded-full">
                                        <UserIcon size={16} className="text-orange-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-800 hidden md:inline">{user.name}</span>
                                </div>
                                <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </nav>
                    ) : (
                        <nav>
                            <Link to="/login" className="text-orange-600 font-bold hover:underline">Sign In</Link>
                        </nav>
                    )}
                </div>
            </header>
            <main>
                {children}
            </main>
            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SnapChef. AI-Powered Culinary Assistant.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
