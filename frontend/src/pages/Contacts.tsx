import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';

interface Contact {
    id: string;
    name: string;
    type: string;
    phone: string;
    address: string;
    notes?: string;
    balance?: string; // Backend doesn't seem to have balance yet, keeping for UI consistency if needed or mapping it
}

export function Contacts() {
    const [activeTab, setActiveTab] = useState<'all' | 'suppliers' | 'clients'>('all');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        type: 'RECOLECTOR',
        notes: ''
    });

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/contacts');
            if (!response.ok) throw new Error('Failed to fetch contacts');
            const data = await response.json();
            setContacts(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error al cargar contactos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleCreateContact = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to create contact');

            await fetchContacts();
            setIsModalOpen(false);
            setFormData({ name: '', phone: '', address: '', type: 'RECOLECTOR', notes: '' });
        } catch (err) {
            console.error(err);
            alert('Error al crear contacto');
        }
    };

    const handleDeleteContact = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

        try {
            const response = await fetch(`http://localhost:3000/contacts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete contact');
            await fetchContacts();
        } catch (err) {
            console.error(err);
            alert('Error al eliminar contacto');
        }
    };

    const filteredContacts = contacts.filter(contact => {
        if (activeTab === 'all') return true;
        // Adjust logic based on how you want to categorize types
        if (activeTab === 'suppliers') return ['RECOLECTOR', 'INDUSTRIA'].includes(contact.type);
        if (activeTab === 'clients') return ['COMPRADOR', 'TALLER'].includes(contact.type);
        return true;
    });

    const columns = [
        { header: 'Nombre', accessorKey: 'name' as keyof Contact, className: 'font-medium text-white' },
        {
            header: 'Tipo',
            accessorKey: 'type' as keyof Contact,
            cell: (row: Contact) => (
                <span className={`px-2 py-1 rounded text-xs ${['COMPRADOR', 'TALLER'].includes(row.type)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-purple-500/20 text-purple-400'
                    }`}>
                    {row.type}
                </span>
            )
        },
        { header: 'Teléfono', accessorKey: 'phone' as keyof Contact },
        { header: 'Ciudad/Dirección', accessorKey: 'address' as keyof Contact },
        {
            header: 'Acciones',
            id: 'actions',
            cell: (row: Contact) => (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => handleDeleteContact(row.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Directorio</h1>
                    <p className="text-gray-400">Proveedores, Clientes y Transportistas.</p>
                </div>
                <Button size="lg" onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Nuevo Contacto
                </Button>
            </div>

            <div className="flex space-x-1 bg-secondary/30 p-1 rounded-lg w-fit">
                {['all', 'suppliers', 'clients'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                            ? 'bg-surface text-white shadow-sm'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {tab === 'all' ? 'Todos' : tab === 'suppliers' ? 'Proveedores' : 'Clientes'}
                    </button>
                ))}
            </div>

            {error && (
                <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
                    {error}
                </div>
            )}

            {isLoading && (
                <div className="text-center py-8 text-gray-400 animate-pulse">
                    Cargando contactos...
                </div>
            )}

            {!isLoading && <Table data={filteredContacts} columns={columns} />}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nuevo Contacto"
            >
                <form onSubmit={handleCreateContact} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nombre</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nombre del contacto"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Tipo</label>
                        <select
                            className="flex h-10 w-full rounded-md border border-secondary bg-surface px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="RECOLECTOR">Recolector</option>
                            <option value="TALLER">Taller</option>
                            <option value="INDUSTRIA">Industria</option>
                            <option value="COMPRADOR">Comprador</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Teléfono</label>
                        <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="555-0000"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Dirección</label>
                        <Input
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Ciudad, Estado"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Notas</label>
                        <Input
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Notas adicionales"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Guardar Contacto
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
