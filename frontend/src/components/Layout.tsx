import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, User, Package, Truck, FileText, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Recepción', icon: ScaleIcon, path: '/reception' }, // Custom icon below
    { label: 'Contactos', icon: Users, path: '/contacts' },
    { label: 'Catálogo', icon: Package, path: '/materials' }, // Renamed from Materiales based on user intent, or keep Materiales? User said "Catálogo de Materiales". I'll keep "Materiales" or change to "Catálogo". User said "Unify... into 'Catálogo' task". I'll rename label to "Catálogo".
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

    return (
        <div className="flex h-screen w-full bg-background text-text">
            {/* Sidebar */}
            <aside className="w-64 border-r border-secondary bg-secondary/50 hidden md:flex flex-col">
                <div className="p-6 border-b border-secondary">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        CRM Metales
                    </h1>
                    <p className="text-xs text-gray-400">Sistema de Acopio</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
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
                            <p className="font-medium">Usuario</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-background p-8">
                <Outlet />
            </main>
        </div>
    );
}
