import { useFuncionarios } from "@/context/funcionariosContext";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { PageSize } from "@/types/pagination";

interface Props {
    currentPage: number;
    lastPage: number;
}

const FuncionariosPagination: React.FC<Props> = ({ currentPage, lastPage }) => {

    const { page, pageSize, changePage, changePageSize, resetPage } = useFuncionarios();

    const renderPaginationItems = () => {
        const pagesToShow = [];

        if (lastPage <= 3) {
            for (let i = 1; i <= lastPage; i++) {
                pagesToShow.push(i);
            }
        } else {
            if (currentPage > 1) pagesToShow.push(currentPage - 1);
            pagesToShow.push(currentPage);
            if (currentPage < lastPage) pagesToShow.push(currentPage + 1);
        }

        return pagesToShow.map(page => (
            <PaginationItem key={page}>
                <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => changePage(page, lastPage)}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));
    };

    const handlePageSizeChange = (value: string) => {
        const size = parseInt(value, 10);
        if (!isNaN(size)) {
            changePageSize(size as PageSize);
            resetPage();
        }

    };

    return (
        <div className="flex flex-row justify-between items-end w-full">
            <div className="w-20">
            </div>
            <Pagination className="w-full">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => changePage(currentPage - 1, lastPage)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => changePage(currentPage + 1, lastPage)}
                            className={currentPage === lastPage ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="w-20 flex flex-col justify-start items-start gap-1">
                <p className="text-xs text-gray-500">Por página</p>
                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-20 bg-gray-100">
                        <SelectValue placeholder="Por página" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Por página</SelectLabel>
                            <SelectItem value={PageSize.TEN.toString()}>{PageSize.TEN}</SelectItem>
                            <SelectItem value={PageSize.FIFTEEN.toString()}>{PageSize.FIFTEEN}</SelectItem>
                            <SelectItem value={PageSize.TWENTY.toString()}>{PageSize.TWENTY}</SelectItem>
                            <SelectItem value={PageSize.TWENTY_FIVE.toString()}>{PageSize.TWENTY_FIVE}</SelectItem>
                            <SelectItem value={PageSize.THIRTY.toString()}>{PageSize.THIRTY}</SelectItem>
                            <SelectItem value={PageSize.THIRTY_FIVE.toString()}>{PageSize.THIRTY_FIVE}</SelectItem>
                            <SelectItem value={PageSize.FORTY.toString()}>{PageSize.FORTY}</SelectItem>
                            <SelectItem value={PageSize.FORTY_FIVE.toString()}>{PageSize.FORTY_FIVE}</SelectItem>
                            <SelectItem value={PageSize.FIFTY.toString()}>{PageSize.FIFTY}</SelectItem>
                            <SelectItem value={PageSize.HUNDRED.toString()}>{PageSize.HUNDRED}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default FuncionariosPagination;