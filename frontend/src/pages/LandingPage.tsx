import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import DashboardHero from '../assets/dashboard-hero.jpg';

// Icons
const CheckIcon = () => (
    <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const FeaturesIcon = () => (
    <svg className="w-12 h-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
)

const SecurityIcon = () => (
    <svg className="w-12 h-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
)

const GlobalIcon = () => (
    <svg className="w-12 h-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                CRM Metales
                            </span>
                        </div>
                        <div>
                            <Button onClick={() => navigate('/login')} variant="accent">
                                Iniciar Sesión / Registrarse
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow">
                <div className="relative isolate overflow-hidden pt-14">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 -z-20 h-full w-full">
                        <img
                            src={DashboardHero}
                            alt="Scrapyard"
                            className="h-full w-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950"></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 relative z-10">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-white drop-shadow-2xl">
                                Optimiza tu negocio de reciclaje de metales
                            </h1>
                            <p className="text-lg leading-8 text-zinc-300 mb-10 drop-shadow-md">
                                La plataforma todo en uno para gestionar compras, ventas, inventario y contactos via. Diseñada específicamente para la industria del reciclaje de metales para aumentar la eficiencia y la rentabilidad.
                            </p>
                            <div className="flex items-center justify-center gap-x-6">
                                <Button onClick={() => navigate('/login')} className="px-8 py-3 text-lg shadow-lg shadow-orange-500/20" variant="accent">
                                    Comenzar Gratis
                                </Button>
                                <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-orange-400 transition drop-shadow-md">
                                    Saber más <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div id="features" className="py-24 sm:py-32 bg-zinc-900/30">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center mb-16">
                            <h2 className="text-base font-semibold leading-7 text-orange-500">Implementación rápida</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Todo lo que necesitas para gestionar tu chatarrera</p>
                            <p className="mt-6 text-lg leading-8 text-zinc-400">
                                Olvídate de las hojas de cálculo y el papel. Cámbiate a una solución moderna que crece con tu negocio.
                            </p>
                        </div>
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                                <div className="flex flex-col items-start bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/30 transition-colors">
                                    <FeaturesIcon />
                                    <h3 className="text-xl font-semibold leading-7 text-white mb-2">Inventario en Tiempo Real</h3>
                                    <p className="leading-7 text-zinc-400">Rastrea entradas y salidas de metales al instante. Conoce exactamente qué tienes y su valor estimado basado en precios actuales.</p>
                                </div>
                                <div className="flex flex-col items-start bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/30 transition-colors">
                                    <SecurityIcon />
                                    <h3 className="text-xl font-semibold leading-7 text-white mb-2">Seguro y Confiable</h3>
                                    <p className="leading-7 text-zinc-400">Tus datos están encriptados y respaldados de forma segura. Accede a la información de tu negocio desde cualquier lugar.</p>
                                </div>
                                <div className="flex flex-col items-start bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/30 transition-colors">
                                    <GlobalIcon />
                                    <h3 className="text-xl font-semibold leading-7 text-white mb-2">Gestión de Proveedores</h3>
                                    <p className="leading-7 text-zinc-400">Administra tus relaciones con proveedores y compradores. Mantén un historial de transacciones y contactos en un solo lugar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price/Benefits Section */}
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Precios simples y transparentes</h2>
                            <p className="mt-6 text-lg leading-8 text-zinc-400">
                                Empieza gratis, mejora cuando crezcas. No se requiere tarjeta de crédito.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-zinc-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                            <div className="p-8 sm:p-10 lg:flex-auto">
                                <h3 className="text-2xl font-bold tracking-tight text-white">Prueba Gratuita (3 Meses)</h3>
                                <p className="mt-6 text-base leading-7 text-zinc-400">
                                    Únete ahora y disfruta de 3 meses completamente gratis. Después, una tarifa mensual accesible para seguir impulsando tu negocio.
                                </p>
                                <div className="mt-10 flex items-center gap-x-4">
                                    <h4 className="flex-none text-sm font-semibold leading-6 text-orange-500">Qué incluye</h4>
                                    <div className="h-px flex-auto bg-zinc-700"></div>
                                </div>
                                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-zinc-300 sm:grid-cols-2 sm:gap-6">
                                    <li className="flex gap-x-3"><CheckIcon /> Transacciones Ilimitadas</li>
                                    <li className="flex gap-x-3"><CheckIcon /> Reportes Avanzados</li>
                                    <li className="flex gap-x-3"><CheckIcon /> Acceso Multiusuario</li>
                                    <li className="flex gap-x-3"><CheckIcon /> Soporte Prioritario</li>
                                </ul>
                            </div>
                            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                                <div className="rounded-2xl bg-zinc-900 py-10 text-center ring-1 ring-inset ring-zinc-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                    <div className="mx-auto max-w-xs px-8">
                                        <p className="text-base font-semibold text-zinc-400">Suscripción Mensual</p>
                                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                            <span className="text-5xl font-bold tracking-tight text-white">$1000</span>
                                            <span className="text-sm font-semibold leading-6 text-zinc-400">MXN/mes</span>
                                        </p>
                                        <Button onClick={() => navigate('/login')} className="mt-10 w-full justify-center" variant="primary">
                                            Empezar Prueba Gratis
                                        </Button>
                                        <p className="mt-6 text-xs leading-5 text-zinc-500">*Después de 3 meses de prueba</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="bg-zinc-900 border-t border-zinc-800">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-zinc-500">
                            &copy; 2024 CRM Metales. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="flex justify-center space-x-6 md:order-2">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </footer>
        </div>
    );
}
