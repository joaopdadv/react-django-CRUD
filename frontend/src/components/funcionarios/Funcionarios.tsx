import React from "react";
import FuncionariosSearch from "./FuncionariosSearch";
import FuncionariosTable from "./FuncionariosTable";
import FuncionariosForm from "./FuncionariosForm";

const Funcionarios: React.FC = () => {
    return <div className="w-full flex-1 ">
        <div className="flex flex-row items-center justify-between w-full p-10">
            <h2 className="text-3xl font-medium">Funcionários</h2>
            <div className="flex items-center gap-4">
                <FuncionariosForm />
                <FuncionariosSearch />
            </div>
        </div>
        <FuncionariosTable />
    </div>;
};

export default Funcionarios;