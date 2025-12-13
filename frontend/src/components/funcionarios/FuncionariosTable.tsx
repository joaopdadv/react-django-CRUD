import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { funcionariosService } from '@/services/funcionariosService';
import type { Funcionario } from '@/types/funcionario';
import type { Page } from '@/types/pagination';
import { useFuncionarios } from '@/context/funcionariosContext';
import { toast } from 'sonner';
import FuncionariosPagination from './FuncionariosPagination';

interface FuncionariosTableProps { }

const FuncionariosTable: React.FC<FuncionariosTableProps> = () => {
    const [funcionarios, setFuncionarios] = useState<Page<Funcionario>>({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });
    const { refresh, page, pageSize } = useFuncionarios();

    useEffect(() => {
        funcionariosService.getAll(page, pageSize).then((data) => {
            setFuncionarios(data);
        }).catch(() => {
            toast.error('Erro ao carregar funcionários.');
        });
    }, [refresh, page, pageSize]);

    return (
        <div className='w-[90%] mx-auto h-full flex flex-col flex-1 py-4'>
            <div className='flex-1 overflow-auto'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {funcionarios?.results?.map((f) => (
                            <TableRow key={String(f.id)}>
                                <TableCell className="font-medium">{f.id ?? '-'}</TableCell>
                                <TableCell>{f.nome ?? '-'}</TableCell>
                                <TableCell>{f.sobrenome ?? '-'}</TableCell>
                                <TableCell>{f.cpf ? f.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '-'}</TableCell>
                                <TableCell>{f.cargo ?? '-'}</TableCell>
                                <TableCell>{f.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='py-4'>
                <FuncionariosPagination currentPage={page} lastPage={Math.ceil(funcionarios.count / pageSize)} />
            </div>
        </div>
    );
};

export default FuncionariosTable;
