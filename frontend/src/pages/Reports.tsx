import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { TrendingUp, Download, Calendar } from 'lucide-react';

interface MaterialStats {
    id: string;
    material: string;
    avgBuy: string;
    currentSell: string;
    margin: string;
    marginPercent: string;
    stock: string;
}

interface DashboardStats {
    grossProfit: string;
    inventoryValue: string;
    margins: MaterialStats[];
}

export function Reports() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_URL}/reports/dashboard`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                console.error('Failed to fetch dashboard stats');
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { header: 'Material', accessorKey: 'material' as keyof MaterialStats, className: 'font-medium text-white' },
        { header: 'Stock Actual', accessorKey: 'stock' as keyof MaterialStats },
        { header: 'Precio Compra Prom.', accessorKey: 'avgBuy' as keyof MaterialStats, cell: (row: any) => `$${row.avgBuy}` },
        { header: 'Precio Venta Actual', accessorKey: 'currentSell' as keyof MaterialStats, cell: (row: any) => `$${row.currentSell}` },
        {
            header: 'Margen ($)',
            accessorKey: 'margin' as keyof MaterialStats,
            className: 'text-green-500 font-bold',
            cell: (row: any) => `$${row.margin}`
        },
        {
            header: 'Margen (%)',
            accessorKey: 'marginPercent' as keyof MaterialStats,
            cell: (row: any) => (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full w-fit text-xs font-bold ${parseFloat(row.marginPercent) >= 20 ? 'text-green-500 bg-green-500/10' : 'text-yellow-500 bg-yellow-500/10'
                    }`}>
                    <TrendingUp className="w-3 h-3" />
                    {row.marginPercent}
                </div>
            )
        },
    ];

    if (loading) {
        return <div className="p-6 text-center text-gray-400">Cargando reportes...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Reportes de Negocio</h1>
                    <p className="text-gray-400">Análisis de márgenes y rentabilidad por material.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Este Mes
                    </Button>
                    <Button variant="secondary" className="gap-2">
                        <Download className="w-4 h-4" />
                        Exportar Excel
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-400 mb-2">Utilidad Bruta (Est.)</p>
                        <h3 className="text-3xl font-bold text-green-500">
                            ${stats?.grossProfit ? Number(stats.grossProfit).toLocaleString() : '0.00'}
                        </h3>
                        <p className="text-xs text-green-400 mt-2 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12% vs mes anterior
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-400 mb-2">Valor Inventario</p>
                        <h3 className="text-3xl font-bold text-white">
                            ${stats?.inventoryValue ? Number(stats.inventoryValue).toLocaleString() : '0.00'}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">Costo promedio ponderado</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Margen por Material</h3>
                    <Table data={stats?.margins || []} columns={columns} />
                </CardContent>
            </Card>
        </div>
    );
}
