import React from 'react';

interface Column<T> {
    header: string;
    accessorKey: keyof T | ((row: T) => React.ReactNode);
    cell?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (row: T) => string | number;
}

export function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
    return (
        <div className="w-full overflow-x-auto border border-slate-700 rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-800 border-b border-slate-700">
                        {columns.map((col, index) => (
                            <th key={index} className="p-4 text-sm font-semibold text-slate-300">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="p-8 text-center text-slate-500">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={keyExtractor(row)}
                                className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors"
                            >
                                {columns.map((col, index) => {
                                    const content = col.cell
                                        ? col.cell(row)
                                        : typeof col.accessorKey === 'function'
                                            ? col.accessorKey(row)
                                            : (row[col.accessorKey] as React.ReactNode);

                                    return (
                                        <td key={index} className="p-4 text-sm text-slate-300">
                                            {content}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
