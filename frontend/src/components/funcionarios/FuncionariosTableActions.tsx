import type { Funcionario } from '@/types/funcionario';
import React from 'react';
import FuncionariosDelete from './FuncionariosDelete';
import FuncionariosForm from './FuncionariosForm';
import { FaEdit, FaEye } from 'react-icons/fa';

interface FuncionariosTableActionsProps {
    funcionario: Funcionario;
}

const FuncionariosTableActions: React.FC<FuncionariosTableActionsProps> = ({ funcionario }) => {
    return (
        <div className='flex flex-row items-center justify-center gap-4'>
            <FuncionariosForm funcionario={funcionario} readonly>
                <FaEye size={20} className='cursor-pointer text-gray-500 hover:text-black transition' />
            </FuncionariosForm>
            <FuncionariosForm funcionario={funcionario}>
                <FaEdit size={20} className='cursor-pointer text-gray-500 hover:text-black transition' />
            </FuncionariosForm>
            <FuncionariosDelete funcionario={funcionario} />
        </div>
    );
};

export default FuncionariosTableActions;