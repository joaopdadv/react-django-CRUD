export interface Funcionario {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    cargo: string;
    ativo: boolean;
}

export interface FuncionarioRequest {
    nome: string;
    sobrenome: string;
    cpf: string;
    cargo: string;
    ativo: boolean;
}