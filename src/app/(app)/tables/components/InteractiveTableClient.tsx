"use client";

import React, { useState, useMemo } from 'react';
import type { TableRowData } from '@/lib/types';
import { sampleTableData } from '@/lib/data';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type SortKey = keyof TableRowData | '';
type SortDirection = 'asc' | 'desc';

export function InteractiveTableClient() {
  const [data, setData] = useState<TableRowData[]>(sampleTableData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredData = useMemo(() => {
    let filtered = data;
    if (searchTerm) {
      filtered = data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortKey) {
      filtered.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, searchTerm, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey === key) {
      return sortDirection === 'asc' ? '🔼' : '🔽';
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100" />;
  };
  
  const getStatusBadgeVariant = (status: TableRowData['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'active': return 'default'; // Using primary for active
      case 'inactive': return 'secondary';
      case 'pending': return 'outline'; // Using accent or a custom variant for pending might be better
      default: return 'outline';
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
            aria-label="Search table"
          />
        </div>
        {/* Add more controls like "Add User" button if needed */}
      </div>
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {(['name', 'email', 'role', 'lastLogin', 'status'] as Array<keyof TableRowData>).map((key) => (
                <TableHead key={key}>
                  <Button variant="ghost" onClick={() => handleSort(key)} className="group px-0 hover:bg-transparent">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} {/* Format key for display */}
                    {getSortIndicator(key)}
                  </Button>
                </TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.lastLogin}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions for {row.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      {/* Add pagination controls if needed */}
    </div>
  );
}

// Dummy Card component to resolve TS error if not imported
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  )
);
Card.displayName = "Card";
