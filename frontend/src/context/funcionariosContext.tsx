import React, { createContext, useContext, useState, useCallback } from "react";

type FuncionariosContextValue = {
    refresh: boolean;
    reload: () => void;
    page: number;
    pageSize: number;
    resetPage: () => void;
    changePage: (page: number, lastPage: number) => Promise<number>;
    changePageSize: (size: number) => void;
    ordering: string;
    setOrdering: (order: string) => void;
};

const FuncionariosContext = createContext<FuncionariosContextValue | undefined>(undefined);

export const FuncionariosProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [ordering, setOrdering] = useState<string>("id");

    const changePage = (newPage: number, lastPage: number): Promise<number> => {
        if (newPage >= 1 && newPage <= lastPage) {
            setPage(newPage);
            return Promise.resolve(newPage);
        }
        throw new Error("Invalid page number");
    };

    const changePageSize = (size: number) => {
        setPageSize(size);
        setPage(1); // comportamento comum ao mudar pageSize
    };

    const resetPage = () => setPage(1);

    const reload = useCallback(() => {
        setRefresh(prev => !prev);
    }, []);

    return (
        <FuncionariosContext.Provider value={{ refresh, reload, page, pageSize, resetPage, changePage, changePageSize, ordering, setOrdering }}>
            {children}
        </FuncionariosContext.Provider>
    );
};

export const useFuncionarios = (): FuncionariosContextValue => {
    const ctx = useContext(FuncionariosContext);
    if (!ctx) {
        throw new Error("useFuncionarios must be used within a FuncionariosProvider");
    }
    return ctx;
};