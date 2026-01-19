import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Plus, Tag, TrendingUp, TrendingDown, Edit2 } from 'lucide-react';

interface Material {
    id: string;
    name: string;
    type: string;
    unit: string;
    buyPrice: string; // Backend sends string for decimals
    sellPrice: string;
    stock: string;
}

export function Materials() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        buyPrice: '',
        sellPrice: '',
        stock: '',
    });

    const fetchMaterials = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:3000/materials');
            if (res.ok) setMaterials(await res.json());
        } catch (error) {
            console.error('Error fetching materials:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleEdit = (material: Material) => {
        setSelectedMaterial(material);
        setFormData({
            name: material.name,
            buyPrice: material.buyPrice?.toString() || '',
            sellPrice: material.sellPrice?.toString() || '',
            stock: material.stock?.toString() || '',
        });
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setSelectedMaterial(null);
        setFormData({ name: '', buyPrice: '', sellPrice: '', stock: '' });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        const payload = {
            name: formData.name,
            type: 'METAL', // Defaulting for now
            unit: 'kg',   // Defaulting for now
            buyPrice: parseFloat(formData.buyPrice) || 0,
            sellPrice: parseFloat(formData.sellPrice) || 0,
            stock: parseFloat(formData.stock) || 0,
        };

        try {
            const method = selectedMaterial ? 'PATCH' : 'POST';
            const url = selectedMaterial
                ? `http://localhost:3000/materials/${selectedMaterial.id}`
                : 'http://localhost:3000/materials';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                await fetchMaterials();
                setIsModalOpen(false);
            } else {
                alert('Error al guardar material');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
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

            {isLoading ? (
                <div className="text-center py-8 text-gray-400 animate-pulse">Cargando materiales...</div>
            ) : (
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
                                    {/* Mocking trend for UI consistency until we have history */}
                                    <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full text-gray-400 bg-gray-500/10">
                                        Active
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold mb-1">{material.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">Stock: {material.stock} {material.unit}</p>

                                <div className="space-y-2 pt-4 border-t border-secondary/50">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Compra:</span>
                                        <span className="font-bold text-white">${material.buyPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Venta:</span>
                                        <span className="font-bold text-green-500">${material.sellPrice}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedMaterial ? "Editar Material" : "Nuevo Material"}>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Nombre del Material</label>
                        <Input
                            placeholder="Ej. Cobre Premium"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Precio Compra ($)</label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={formData.buyPrice}
                                onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Precio Venta ($)</label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={formData.sellPrice}
                                onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Stock Inicial/Actual</label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                    </div>
                    <Button className="w-full mt-4" onClick={handleSave}>
                        {selectedMaterial ? "Guardar Cambios" : "Crear Material"}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
