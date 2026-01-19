import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Plus, Truck, TrendingUp, DollarSign, Edit, Trash2 } from 'lucide-react';

interface Sale {
    id: string;
    client: string;
    material: string;
    weight: number;
    price: number;
    total: number;
    status: string;
    createdAt: string;
}

export function Sales() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]); // Assuming clients come from contacts

    // Form state
    const [formData, setFormData] = useState({
        client: '',
        material: '',
        weight: '',
        price: '',
        status: 'Pendiente'
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        fetchSales();
        fetchMaterials();
        fetchClients();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await fetch(`${API_URL}/sales`);
            if (response.ok) {
                const data = await response.json();
                setSales(data);
            }
        } catch (error) {
            console.error('Error fetching sales:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMaterials = async () => {
        try {
            const response = await fetch(`${API_URL}/materials`);
            if (response.ok) {
                const data = await response.json();
                setMaterials(data);
            }
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await fetch(`${API_URL}/contacts`);
            if (response.ok) {
                const data = await response.json();
                // Filter for customers/clients if needed, or just list all
                setClients(data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    // Calculate total dynamically or set it on submit
    const calculateTotal = () => {
        const weight = parseFloat(formData.weight) || 0;
        const price = parseFloat(formData.price) || 0;
        return (weight * price).toFixed(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const total = parseFloat(formData.weight) * parseFloat(formData.price);

        try {
            const response = await fetch(`${API_URL}/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    weight: parseFloat(formData.weight),
                    price: parseFloat(formData.price),
                    total: total
                }),
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchSales();
                setFormData({
                    client: '',
                    material: '',
                    weight: '',
                    price: '',
                    status: 'Pendiente'
                });
            } else {
                console.error('Error creating sale');
            }
        } catch (error) {
            console.error('Error creating sale:', error);
        }
    };

    const columns = [
        { header: 'Cliente', accessorKey: 'client' as keyof Sale, className: 'font-medium text-white' },
        { header: 'Material', accessorKey: 'material' as keyof Sale },
        {
            header: 'Peso (kg)',
            accessorKey: 'weight' as keyof Sale,
            cell: (row: Sale) => `${row.weight} kg`
        },
        {
            header: 'Precio/kg',
            accessorKey: 'price' as keyof Sale,
            cell: (row: Sale) => `$${row.price}`
        },
        {
            header: 'Total',
            accessorKey: 'total' as keyof Sale,
            className: 'text-green-500 font-bold',
            cell: (row: Sale) => `$${row.total}`
        },
        {
            header: 'Estado',
            accessorKey: 'status' as keyof Sale,
            cell: (row: Sale) => (
                <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Finalizado' || row.status === 'Pagado'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Fecha',
            accessorKey: 'createdAt' as keyof Sale,
            cell: (row: Sale) => new Date(row.createdAt).toLocaleDateString()
        }
    ];

    // Stats calculations
    const totalSales = sales.reduce((acc, curr) => acc + Number(curr.total), 0);
    const totalWeight = sales.reduce((acc, curr) => acc + Number(curr.weight), 0);
    // Assuming "Embarques" roughly equates to number of sales for now, or specific shipments if we had that distinction
    const shipmentCount = sales.length;

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
                            <p className="text-sm text-gray-400">Embarques Totales</p>
                            <p className="text-2xl font-bold">{shipmentCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Ventas Totales</p>
                            <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-orange-500/20 text-orange-500">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Peso Total (kg)</p>
                            <p className="text-2xl font-bold">{totalWeight.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    {loading ? (
                        <div className="text-center py-4">Cargando ventas...</div>
                    ) : (
                        <Table data={sales} columns={columns} />
                    )}
                </CardContent>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nueva Venta">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Cliente</label>
                        <select
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.client}
                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                            required
                        >
                            <option value="">Seleccione un cliente</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.name}>{client.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Material</label>
                        <select
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.material}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            required
                        >
                            <option value="">Seleccione material</option>
                            {materials.map(material => (
                                <option key={material.id} value={material.name}>{material.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Peso (kg)</label>
                            <input
                                type="number"
                                step="any"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Precio Venta ($)</label>
                            <input
                                type="number"
                                step="any"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Estimado:</span>
                            <span className="text-green-500">${calculateTotal()}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            className="w-full bg-gray-700 hover:bg-gray-600"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="w-full">
                            Guardar Venta
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
