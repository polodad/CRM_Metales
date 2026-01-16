import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    className?: string;
    onRowClick?: (item: T) => void;
}

export function Table<T>({ data, columns, className, onRowClick }: TableProps<T>) {
    return (
        <div className={cn("w-full overflow-auto rounded-xl border border-secondary bg-surface/50", className)}>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-secondary/50 border-b border-secondary">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className={cn("px-6 py-3 font-medium", col.className)}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                No hay datos disponibles
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={cn(
                                    "border-b border-secondary last:border-0 hover:bg-secondary/30 transition-colors",
                                    onRowClick && "cursor-pointer"
                                )}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
                                        {col.cell
                                            ? col.cell(row)
                                            : col.accessorKey
                                                ? (row[col.accessorKey] as ReactNode)
                                                : null}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
