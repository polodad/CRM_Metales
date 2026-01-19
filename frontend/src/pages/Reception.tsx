import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Plus, Scale, DollarSign, User, Camera, FileText } from 'lucide-react';

interface Purchase {
    id: string;
    supplier: string;
    material: string;
    weight: number;
    price: number;
    total: number;
    status: string;
    createdAt: string;
}

interface Contact {
    id: string;
    name: string;
}

interface Material {
    id: string;
    name: string;
    price: number;
}

export function Reception() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [grossWeight, setGrossWeight] = useState('');
    const [tara, setTara] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState(0);

    // Fetch Initial Data
    useEffect(() => {
        fetchPurchases();
        fetchContacts();
        fetchMaterials();
    }, []);

    useEffect(() => {
        const w = parseFloat(grossWeight) || 0;
        const t = parseFloat(tara) || 0;
        const p = parseFloat(price) || 0;
        setTotal((w - t) * p);
    }, [grossWeight, tara, price]);

    const fetchPurchases = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:3000/purchases');
            if (res.ok) setPurchases(await res.json());
        } catch (error) {
            console.error('Error fetching purchases:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await fetch('http://localhost:3000/contacts');
            if (res.ok) setContacts(await res.json());
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const fetchMaterials = async () => {
        try {
            const res = await fetch('http://localhost:3000/materials');
            if (res.ok) setMaterials(await res.json());
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };

    const handleSavePurchase = async () => {
        const weight = (parseFloat(grossWeight) || 0) - (parseFloat(tara) || 0);
        if (!selectedSupplier || !selectedMaterial || weight <= 0) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        const purchaseData = {
            supplier: selectedSupplier,
            material: selectedMaterial,
            weight,
            price: parseFloat(price) || 0,
            total,
            status: 'Pagado'
        };

        try {
            const res = await fetch('http://localhost:3000/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData)
            });

            if (res.ok) {
                await fetchPurchases();
                setIsModalOpen(false);
                // Reset form
                setGrossWeight('');
                setTara('');
                setPrice('');
                setSelectedSupplier('');
                setSelectedMaterial('');
            } else {
                alert('Error al guardar la compra');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    };

    const columns = [
        { header: 'Folio', accessorKey: 'id' as keyof Purchase, className: 'font-mono text-gray-400 text-xs' },
        {
            header: 'Fecha',
            accessorKey: 'createdAt' as keyof Purchase,
            cell: (row: Purchase) => new Date(row.createdAt).toLocaleString()
        },
        { header: 'Proveedor', accessorKey: 'supplier' as keyof Purchase, className: 'font-medium text-white' },
        { header: 'Material', accessorKey: 'material' as keyof Purchase },
        { header: 'Peso', accessorKey: 'weight' as keyof Purchase, cell: (row: Purchase) => `${row.weight} kg` },
        { header: 'Precio/kg', accessorKey: 'price' as keyof Purchase, cell: (row: Purchase) => `$${row.price}` },
        { header: 'Total', accessorKey: 'total' as keyof Purchase, className: 'text-green-500 font-bold', cell: (row: Purchase) => `$${row.total.toLocaleString()}` },
        {
            header: 'Estado',
            cell: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Pagado' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {row.status}
                </span>
            )
        },
    ];

    // Calculate daily summaries from real data (this assumes data is all time, ideally backend should aggregate)
    // For now, doing simple clientside sum
    const dailyWeight = purchases.reduce((acc, curr) => acc + Number(curr.weight), 0);
    const dailySpend = purchases.reduce((acc, curr) => acc + Number(curr.total), 0);
    const uniqueSuppliers = new Set(purchases.map(p => p.supplier)).size;

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
                            <p className="text-sm text-gray-400">Kilos Totales</p>
                            <p className="text-2xl font-bold">{dailyWeight.toFixed(1)} kg</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Gastado Total</p>
                            <p className="text-2xl font-bold">${dailySpend.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-3 rounded-full bg-purple-500/20 text-purple-500">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Proveedores Activos</p>
                            <p className="text-2xl font-bold">{uniqueSuppliers}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-gray-400 animate-pulse">Cargando compras...</div>
            ) : (
                <Table data={purchases} columns={columns} />
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Compra">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-sm text-gray-400 mb-1 block">Proveedor</label>
                            <select
                                className="w-full h-10 rounded-md border border-secondary bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                value={selectedSupplier}
                                onChange={(e) => setSelectedSupplier(e.target.value)}
                            >
                                <option value="">Seleccionar Proveedor...</option>
                                {contacts.map(contact => (
                                    <option key={contact.id} value={contact.name}>{contact.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm text-gray-400 mb-1 block">Material</label>
                            <select
                                className="w-full h-10 rounded-md border border-secondary bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                value={selectedMaterial}
                                onChange={(e) => {
                                    const matName = e.target.value;
                                    setSelectedMaterial(matName);
                                    const mat = materials.find(m => m.name === matName);
                                    if (mat) setPrice(mat.price.toString());
                                }}
                            >
                                <option value="">Seleccionar Material...</option>
                                {materials.map(material => (
                                    <option key={material.id} value={material.name}>
                                        {material.name} (${material.price})
                                    </option>
                                ))}
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
                                    {((parseFloat(grossWeight) || 0) - (parseFloat(tara) || 0)).toFixed(2)} kg
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

                    <Button className="w-full mt-4" size="lg" onClick={handleSavePurchase}>
                        Guardar y Pagar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
