'use client';

import { useState } from 'react';
import type { Customer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CustomersTable } from './customers-table';
import { CustomerFormDialog } from './customer-form-dialog';

interface CustomersTabProps {
  customers: Customer[];
}

export function CustomersTab({ customers }: CustomersTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
        </Button>
      </div>
      <CustomerFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <CustomersTable customers={customers} />
    </div>
  );
}
