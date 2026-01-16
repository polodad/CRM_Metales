import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Plus, Truck, TrendingUp, DollarSign } from 'lucide-react'; // DollarSign is used in Card 2? Let's check. Yes `DollarSign className="w-8 h-8"`.
// Wait, I see DollarSign is used in Sales line 63.
// Input is unused. Search is unused.


export function Sales() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sales = [
        { id: 'V-2001', date: '2023-10-24', client: 'Fundidora Monterrey', material: 'Cobre Compactado', weight: '500 kg', price: '$135.00', total: '$67,500.00', status: 'Finalizado' },
        { id: 'V-2002', date: '2023-10-25', client: 'Recicladora Nacional', material: 'Aluminio Lingote', weight: '250 kg', price: '$22.00', total: '$5,500.00', status: 'En Tránsito' },
    ];

    const columns = [
        { header: 'Folio', accessorKey: 'id' as keyof typeof sales[0] },
        { header: 'Fecha', accessorKey: 'date' as keyof typeof sales[0] },
        { header: 'Cliente', accessorKey: 'client' as keyof typeof sales[0], className: 'font-medium text-white' },
        { header: 'Material', accessorKey: 'material' as keyof typeof sales[0] },
        { header: 'Peso Salida', accessorKey: 'weight' as keyof typeof sales[0] },
        { header: 'Precio Venta', accessorKey: 'price' as keyof typeof sales[0] },
        { header: 'Total', accessorKey: 'total' as keyof typeof sales[0], className: 'text-green-500 font-bold' },
        {
            header: 'Estado',
            cell: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Finalizado' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {row.status}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Ventas y Embarques</h1>
                    <p className="text-gray-400">Gestiona las salidas de material a fundidoras o clientes mayores.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-lg shadow-primary/25">
                    <Plus className="w-5 h-5 mr-2" />
                    Registrar Venta
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-500">
                            <Truck className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Embarques Mes</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Ventas Mes</p>
                            <p className="text-2xl font-bold">$245,600</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-orange-500/20 text-orange-500">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Margen Promedio</p>
                            <p className="text-2xl font-bold">18%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Table data={sales} columns={columns} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nueva Venta">
                {/* Simplified Form */}
                <div className="space-y-4">
                    <p className="text-gray-400">Formulario de ventas...</p>
                    <Button className="w-full" onClick={() => setIsModalOpen(false)}>Guardar</Button>
                </div>
            </Modal>
        </div>
    );
}
