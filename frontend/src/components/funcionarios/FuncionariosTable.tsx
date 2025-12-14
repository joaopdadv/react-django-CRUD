import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { funcionariosService } from '@/services/funcionariosService';
import type { Funcionario } from '@/types/funcionario';
import type { Page } from '@/types/pagination';
import { useFuncionarios } from '@/context/funcionariosContext';
import { toast } from 'sonner';
import FuncionariosPagination from './FuncionariosPagination';
import { ScrollArea } from '../ui/scroll-area';
import { truncateText } from '@/utils/truncateText';
import FuncionariosTableActions from './FuncionariosTableActions';
import SortableHead from '../global/SortableHeader';

interface FuncionariosTableProps { }

const FuncionariosTable: React.FC<FuncionariosTableProps> = () => {
    const [funcionarios, setFuncionarios] = useState<Page<Funcionario>>({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });
    const { refresh, page, pageSize, ordering, setOrdering, filters } = useFuncionarios();

    useEffect(() => {
        funcionariosService.getAll(page, pageSize, ordering, filters).then((data) => {
            setFuncionarios(data);
        }).catch(() => {
            toast.error('Erro ao carregar funcionários.');
        });
    }, [refresh, page, pageSize, ordering, filters]);

    return (
        <div className='w-[90%] mx-auto h-full flex flex-col flex-1 py-4'>
            <ScrollArea className='overflow-auto grow h-5 overflow-x-hidden px-2' type='always' >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableHead
                                label="ID"
                                field="id"
                                currentOrder={ordering}
                                setOrdering={setOrdering}
                            />
                            <SortableHead
                                label="Nome"
                                field="nome"
                                currentOrder={ordering}
                                setOrdering={setOrdering}
                            />
                            <TableHead>CPF</TableHead>
                            <SortableHead
                                label="Cargo"
                                field="cargo"
                                currentOrder={ordering}
                                setOrdering={setOrdering}
                            />
                            <SortableHead
                                label="Status"
                                field="ativo"
                                currentOrder={ordering}
                                setOrdering={setOrdering}
                            />
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {funcionarios?.results?.map((f) => (
                            <TableRow key={String(f.id)}>
                                <TableCell className="font-medium">{f.id ?? '-'}</TableCell>
                                <TableCell>{f.nome ? truncateText(f.nome + " " + f.sobrenome, 30) : '-'}</TableCell>
                                <TableCell>{f.cpf ? f.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '-'}</TableCell>
                                <TableCell><p>{f.cargo ? truncateText(f.cargo, 20) : '-'}</p></TableCell>
                                <TableCell>{f.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                <TableCell>
                                    <FuncionariosTableActions funcionario={f} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {
                    funcionarios.count === 0 && (
                        <div className='w-full flex justify-center items-center py-10'>
                            Nenhum funcionário encontrado. Altere os filtros ou adicione um novo funcionário.
                        </div>
                    )
                }
            </ScrollArea>
            <div className='py-4'>
                <FuncionariosPagination currentPage={page} lastPage={Math.ceil(funcionarios.count / pageSize)} />
            </div>
        </div>
    );
};

export default FuncionariosTable;
