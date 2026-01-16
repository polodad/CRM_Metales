import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Plus } from 'lucide-react';

export function Contacts() {
    const [activeTab, setActiveTab] = useState<'all' | 'suppliers' | 'clients'>('all');

    // Mock Data
    const contacts = [
        { id: 1, name: 'Juan Pérez', type: 'Proveedor', phone: '555-0123', city: 'Ciudad de México', balance: '$0.00' },
        { id: 2, name: 'Fundidora Monterrey', type: 'Cliente', phone: '818-5678', city: 'Monterrey, NL', balance: 'Credit: $150k' },
    ];

    const columns = [
        { header: 'Nombre', accessorKey: 'name' as keyof typeof contacts[0], className: 'font-medium text-white' },
        {
            header: 'Tipo',
            accessorKey: 'type' as keyof typeof contacts[0],
            cell: (row: any) => (
                <span className={`px-2 py-1 rounded text-xs ${row.type === 'Cliente' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {row.type}
                </span>
            )
        },
        { header: 'Teléfono', accessorKey: 'phone' as keyof typeof contacts[0] },
        { header: 'Ciudad', accessorKey: 'city' as keyof typeof contacts[0] },
        { header: 'Saldo / Crédito', accessorKey: 'balance' as keyof typeof contacts[0] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Directorio</h1>
                    <p className="text-gray-400">Proveedores, Clientes y Transportistas.</p>
                </div>
                <Button size="lg">
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

            <Table data={contacts} columns={columns} />
        </div>
    );
}
