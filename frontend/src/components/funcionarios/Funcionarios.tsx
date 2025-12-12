import React from "react";
import FuncionariosSearch from "./FuncionariosSearch";
import FuncionariosTable from "./FuncionariosTable";

const Funcionarios: React.FC = () => {
    return <div className="w-full flex-1 ">
        <div className="flex flex-row items-center justify-between w-full p-10">
            <h2 className="text-3xl font-medium">Funcionários</h2>
            <FuncionariosSearch />
        </div>
        <FuncionariosTable />
    </div>;
};

export default Funcionarios;