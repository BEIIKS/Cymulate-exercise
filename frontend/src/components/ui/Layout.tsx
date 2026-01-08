import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, LogOut } from 'lucide-react';
import { authService } from '../../services/api';

export const Layout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                        PhishGuard
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link
                        to="/"
                        className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
              ${isActive('/')
                                ? 'bg-blue-600/10 text-blue-400'
                                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}
            `}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                </nav>

                <div className="pt-6 border-t border-slate-700">
                    <button
                        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-red-400 transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-8">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
