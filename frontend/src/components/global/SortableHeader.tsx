import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableHead } from "../ui/table";

const SortableHead = ({ label, field, currentOrder, setOrdering }: any) => {
    const isActive = currentOrder === field || currentOrder === `-${field}`;
    const isDesc = currentOrder === `-${field}`;

    const handleSort = (field: string) => {
        if (currentOrder === field) {
            setOrdering(`-${field}`);
        } else if (currentOrder === `-${field}`) {
            setOrdering('');
        } else {
            setOrdering(field);
        }
    };

    return (
        <TableHead>
            <Button
                variant="ghost"
                className="h-8 px-0! m-0 w-max hover:bg-transparent font-bold "
                onClick={() => handleSort(field)}
            >
                {label}
                {isActive ? (
                    isDesc ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />
                )}
            </Button>
        </TableHead>
    );
};

export default SortableHead;