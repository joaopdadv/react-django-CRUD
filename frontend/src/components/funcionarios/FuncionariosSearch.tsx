import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const FuncionariosSearch: React.FC = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Pesquisar</Button>
            </SheetTrigger>

            <SheetContent side="right" className="sm:w-[380px]">
                <SheetHeader className="mt-4">
                    <SheetTitle>Buscar Funcionários</SheetTitle>
                    <SheetDescription>Filtre e pesquise por funcionários.</SheetDescription>
                </SheetHeader>
                <SheetClose asChild>
                    <XIcon className="absolute top-4 right-4 size-4 cursor-pointer hover:opacity-80" />
                </SheetClose>
                <div className="mt-4 space-y-3">
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FuncionariosSearch;