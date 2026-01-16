

export function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="text-sm text-gray-400">
                    {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Compras Hoy', value: '1,250 kg', trend: '+12%', color: 'text-green-500' },
                    { label: 'Gastos Hoy', value: '$24,500', trend: '-5%', color: 'text-red-500' },
                    { label: 'Tickets', value: '18', trend: 'Normal', color: 'text-gray-400' },
                    { label: 'Material Top', value: 'Cobre 1a', trend: 'High Demand', color: 'text-accent' },
                ].map((stat, i) => (
                    <div key={i} className="bg-secondary/50 border border-secondary p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-xs mt-2 ${stat.color}`}>{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-secondary/50 border border-secondary p-6 rounded-2xl h-80 flex items-center justify-center text-gray-500">
                    Chart Placeholder (Kilos per Material)
                </div>
                <div className="bg-secondary/50 border border-secondary p-6 rounded-2xl h-80 flex items-center justify-center text-gray-500">
                    Recent Activity
                </div>
            </div>
        </div>
    );
}
