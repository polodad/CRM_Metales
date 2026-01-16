import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Plus, Tag, TrendingUp, TrendingDown, Edit2 } from 'lucide-react';

export function Materials() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

    // Mock Data
    const materials = [
        { id: 1, name: 'Cobre de Primera', buyPrice: '$120.00', sellPrice: '$135.00', trend: 'up', change: '+2.5%', stock: '450 kg' },
        { id: 2, name: 'Cobre de Segunda', buyPrice: '$110.00', sellPrice: '$125.00', trend: 'down', change: '-1.0%', stock: '320 kg' },
        { id: 3, name: 'Aluminio Bote', buyPrice: '$18.00', sellPrice: '$22.00', trend: 'stable', change: '0.0%', stock: '1,200 kg' },
        { id: 4, name: 'Bronce', buyPrice: '$85.00', sellPrice: '$100.00', trend: 'up', change: '+0.5%', stock: '150 kg' },
        { id: 5, name: 'Radiador', buyPrice: '$65.00', sellPrice: '$75.00', trend: 'stable', change: '0.0%', stock: '80 kg' },
        { id: 6, name: 'Fierro Viejo', buyPrice: '$3.50', sellPrice: '$5.00', trend: 'down', change: '-5.0%', stock: '5,000 kg' },
    ];

    const handleEdit = (material: any) => {
        setSelectedMaterial(material);
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setSelectedMaterial(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Catálogo de Materiales</h1>
                    <p className="text-gray-400">Gestiona inventario y establece precios de compra/venta.</p>
                </div>
                <Button onClick={handleNew} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Nuevo Material
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {materials.map((material) => (
                    <Card key={material.id} className="hover:border-primary/50 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface" onClick={() => handleEdit(material)}>
                                <Edit2 className="w-4 h-4 text-primary" />
                            </Button>
                        </div>
                        <CardContent className="p-6 pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-secondary text-primary">
                                    <Tag className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${material.trend === 'up' ? 'text-green-500 bg-green-500/10' :
                                    material.trend === 'down' ? 'text-red-500 bg-red-500/10' : 'text-gray-400 bg-gray-500/10'
                                    }`}>
                                    {material.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                                        material.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
                                    {material.change}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-1">{material.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">Stock: {material.stock}</p>

                            <div className="space-y-2 pt-4 border-t border-secondary/50">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Compra:</span>
                                    <span className="font-bold text-white">{material.buyPrice}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Venta:</span>
                                    <span className="font-bold text-green-500">{material.sellPrice}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedMaterial ? "Editar Material" : "Nuevo Material"}>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Nombre del Material</label>
                        <Input placeholder="Ej. Cobre Premium" defaultValue={selectedMaterial?.name} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Precio Compra ($)</label>
                            <Input type="number" placeholder="0.00" defaultValue={selectedMaterial?.buyPrice.replace('$', '')} />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Precio Venta ($)</label>
                            <Input type="number" placeholder="0.00" defaultValue={selectedMaterial?.sellPrice.replace('$', '')} />
                        </div>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setIsModalOpen(false)}>
                        {selectedMaterial ? "Guardar Cambios" : "Crear Material"}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
