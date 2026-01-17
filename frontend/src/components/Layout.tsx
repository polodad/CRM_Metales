import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, User, Package, Truck, FileText, Settings, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Recepción', icon: ScaleIcon, path: '/reception' },
    { label: 'Contactos', icon: Users, path: '/contacts' },
    { label: 'Catálogo', icon: Package, path: '/materials' },
    { label: 'Ventas', icon: Truck, path: '/sales' },
    { label: 'Reportes', icon: FileText, path: '/reports' },
    { label: 'Admin', icon: Settings, path: '/admin' },
];

function ScaleIcon(props: any) {
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
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
    )
}

export function Layout() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-secondary flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        CRM Metales
                    </h1>
                    <p className="text-xs text-gray-400">Sistema de Acopio</p>
                </div>
                {/* Close button for mobile inside the drawer */}
                <button onClick={toggleMobileMenu} className="md:hidden p-2 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "text-gray-400 hover:bg-surface hover:text-white"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-secondary">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-text">Usuario</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex h-screen w-full bg-background text-text overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="w-64 border-r border-secondary bg-secondary/50 hidden md:flex flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Header & Overlay */}
            <div className={`fixed inset-0 z-50 flex md:hidden pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Drawer */}
                <aside
                    className={`relative w-64 h-full bg-secondary border-r border-secondary flex flex-col shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <SidebarContent />
                </aside>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header Bar */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-secondary bg-background z-10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        CRM Metales
                    </h1>
                    <button onClick={toggleMobileMenu} className="p-2 text-gray-400 hover:text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-auto bg-background p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
