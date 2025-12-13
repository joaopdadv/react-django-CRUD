import type { Funcionario } from '@/types/funcionario';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaTrashAlt } from "react-icons/fa";
import { Button } from '../ui/button';
import { funcionariosService } from '@/services/funcionariosService';
import { toast } from 'sonner';
import { useFuncionarios } from '@/context/funcionariosContext';

interface FuncionariosDeleteProps {
    funcionario: Funcionario;
}

const FuncionariosDelete: React.FC<FuncionariosDeleteProps> = ({ funcionario }) => {

    const [open, setOpen] = useState(false);
    const { reload } = useFuncionarios();

    const handleDelete = () => {

        funcionariosService.delete(funcionario.id).then(() => {
            toast.success('Funcionário deletado com sucesso!');
            setOpen(false);
            reload();
        }).catch((e) => {
            console.error(e);
            toast.error('Erro ao deletar funcionário.');
        });

    };

    return (
        <Dialog open={open} onOpenChange={() => { setOpen(!open) }}>
            <DialogTrigger>
                <FaTrashAlt size={20} color='red' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Você tem certeza?</DialogTitle>
                    <DialogDescription>
                        Essa ação não pode ser desfeita. O funcionário "{funcionario.nome} {funcionario.sobrenome}" será removido permanentemente.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        onClick={() => { setOpen(false) }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Excluir
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FuncionariosDelete;