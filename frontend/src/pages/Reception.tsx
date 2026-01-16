import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Plus, Scale, DollarSign, User, Camera, FileText } from 'lucide-react';

export function Reception() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grossWeight, setGrossWeight] = useState('');
    const [tara, setTara] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const w = parseFloat(grossWeight) || 0;
        const t = parseFloat(tara) || 0;
        const p = parseFloat(price) || 0;
        setTotal((w - t) * p);
    }, [grossWeight, tara, price]);

    // Mock Data
    const purchases = [
        { id: '1001', date: '2023-10-25 10:30', supplier: 'Juan Pérez', material: 'Cobre de Primera', weight: '15.5 kg', price: '$120.00', total: '$1,860.00', status: 'Pagado' },
        { id: '1002', date: '2023-10-25 11:15', supplier: 'Metales del Norte', material: 'Aluminio Bote', weight: '50.0 kg', price: '$18.00', total: '$900.00', status: 'Pagado' },
        { id: '1003', date: '2023-10-25 12:00', supplier: 'Cliente Casual', material: 'Fierro Viejo', weight: '120.0 kg', price: '$3.50', total: '$420.00', status: 'Pendiente' },
    ];

    const columns = [
        { header: 'Folio', accessorKey: 'id' as keyof typeof purchases[0], className: 'font-mono text-gray-400' },
        { header: 'Fecha', accessorKey: 'date' as keyof typeof purchases[0] },
        { header: 'Proveedor', accessorKey: 'supplier' as keyof typeof purchases[0], className: 'font-medium text-white' },
        { header: 'Material', accessorKey: 'material' as keyof typeof purchases[0] },
        { header: 'Peso', accessorKey: 'weight' as keyof typeof purchases[0] },
        { header: 'Precio/kg', accessorKey: 'price' as keyof typeof purchases[0] },
        { header: 'Total', accessorKey: 'total' as keyof typeof purchases[0], className: 'text-green-500 font-bold' },
        {
            header: 'Estado',
            cell: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Pagado' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {row.status}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Recepción y Compras</h1>
                    <p className="text-gray-400">Registra entradas de material, calcula totales y adjunta evidencia.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-lg shadow-primary/25">
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Compra
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-500">
                            <Scale className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Kilos Hoy</p>
                            <p className="text-2xl font-bold">185.5 kg</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Gastado Hoy</p>
                            <p className="text-2xl font-bold">$3,180.00</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-purple-500/20 text-purple-500">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Proveedores</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Table data={purchases} columns={columns} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Compra">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-sm text-gray-400 mb-1 block">Proveedor</label>
                            <select className="w-full h-10 rounded-md border border-secondary bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
                                <option>Juan Pérez</option>
                                <option>Metales del Norte</option>
                                <option>Cliente Casual</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm text-gray-400 mb-1 block">Material</label>
                            <select
                                className="w-full h-10 rounded-md border border-secondary bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                onChange={(e) => {
                                    // Mock setting price based on selection
                                    if (e.target.value.includes('Cobre')) setPrice('120');
                                    else if (e.target.value.includes('Aluminio')) setPrice('18');
                                    else setPrice('3.50');
                                }}
                            >
                                <option value="">Seleccionar Material...</option>
                                <option>Cobre de Primera ($120.00)</option>
                                <option>Aluminio Bote ($18.00)</option>
                                <option>Fierro Viejo ($3.50)</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-xl border border-secondary space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-semibold text-gray-400">Cálculo de Peso</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Peso Bruto (kg)</label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={grossWeight}
                                    onChange={(e) => setGrossWeight(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Tara / Merma (kg)</label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={tara}
                                    onChange={(e) => setTara(e.target.value)}
                                    className="text-red-400"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Peso Neto</label>
                                <div className="h-10 flex items-center px-3 font-bold text-lg bg-surface/50 rounded-md border border-secondary">
                                    {(parseFloat(grossWeight) || 0) - (parseFloat(tara) || 0)} kg
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Precio Acordado ($/kg)</label>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Attachments Section */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Evidencia (Opcional)</label>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="w-full flex gap-2 items-center justify-center border-dashed border-2 border-gray-600 bg-transparent hover:bg-secondary/50">
                                <Camera className="w-4 h-4" />
                                Foto Material
                            </Button>
                            <Button variant="secondary" size="sm" className="w-full flex gap-2 items-center justify-center border-dashed border-2 border-gray-600 bg-transparent hover:bg-secondary/50">
                                <FileText className="w-4 h-4" />
                                Identificación
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-secondary flex items-center justify-between">
                        <span className="text-gray-400">Total a Pagar:</span>
                        <span className="text-3xl font-bold text-green-500">
                            ${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    <Button className="w-full mt-4" size="lg" onClick={() => setIsModalOpen(false)}>
                        Guardar y Pagar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
