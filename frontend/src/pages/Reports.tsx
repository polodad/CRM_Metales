import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { TrendingUp, Download, Calendar } from 'lucide-react';

export function Reports() {
    // Mock Data for Margins
    const margins = [
        { id: 1, material: 'Cobre de Primera', avgBuy: '$118.50', currentSell: '$135.00', margin: '$16.50', marginPercent: '13.9%', stock: '450 kg' },
        { id: 2, material: 'Aluminio Bote', avgBuy: '$17.20', currentSell: '$22.00', margin: '$4.80', marginPercent: '27.9%', stock: '1,200 kg' },
        { id: 3, material: 'Bronce', avgBuy: '$82.00', currentSell: '$100.00', margin: '$18.00', marginPercent: '21.9%', stock: '150 kg' },
        { id: 4, material: 'Fierro Viejo', avgBuy: '$3.20', currentSell: '$5.00', margin: '$1.80', marginPercent: '56.2%', stock: '5,000 kg' },
    ];

    const columns = [
        { header: 'Material', accessorKey: 'material' as keyof typeof margins[0], className: 'font-medium text-white' },
        { header: 'Stock Actual', accessorKey: 'stock' as keyof typeof margins[0] },
        { header: 'Precio Compra Prom.', accessorKey: 'avgBuy' as keyof typeof margins[0] },
        { header: 'Precio Venta Actual', accessorKey: 'currentSell' as keyof typeof margins[0] },
        {
            header: 'Margen ($)',
            accessorKey: 'margin' as keyof typeof margins[0],
            className: 'text-green-500 font-bold'
        },
        {
            header: 'Margen (%)',
            accessorKey: 'marginPercent' as keyof typeof margins[0],
            cell: (row: any) => (
                <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-full w-fit text-xs font-bold">
                    <TrendingUp className="w-3 h-3" />
                    {row.marginPercent}
                </div>
            )
        },
    ];

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
                        <h3 className="text-3xl font-bold text-green-500">$42,500</h3>
                        <p className="text-xs text-green-400 mt-2 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12% vs mes anterior
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-400 mb-2">Valor Inventario</p>
                        <h3 className="text-3xl font-bold text-white">$128,400</h3>
                        <p className="text-xs text-gray-500 mt-2">Costo promedio ponderado</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Margen por Material</h3>
                    <Table data={margins} columns={columns} />
                </CardContent>
            </Card>
        </div>
    );
}
