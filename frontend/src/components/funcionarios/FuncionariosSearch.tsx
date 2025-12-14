import * as React from "react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label";
import { useFuncionarios } from "@/context/funcionariosContext";
import type { FuncionariosFilters } from "@/types/filters";

const formSchema = z.object({
    nome: z.string().optional(),
    sobrenome: z.string().optional(),
    cpf: z.string().optional(),
    cargo: z.string().optional(),
    ativo: z.number(), // 1 - Sim, 2 - Não, 3 - Ambos
})

const FuncionariosSearch: React.FC = () => {

    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            sobrenome: "",
            cpf: "",
            cargo: "",
            ativo: 3,
        },
    })
    const { filters, setFilters } = useFuncionarios();

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newFilters: FuncionariosFilters = {
            ...values,
            ativo: values.ativo === 3 ? undefined : values.ativo === 1 ? true : false,
        }
        console.log(newFilters);
        setFilters(newFilters);
        setOpen(false);
    }

    function handleClear() {
        form.reset();
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                <div className="px-4 w-full">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Informe o nome" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sobrenome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Informe o sobrenome" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Informe o CPF"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    field.onChange(value);
                                                }}
                                                value={field.value?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cargo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Informe o cargo" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ativo"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel className="mt-0!">Status</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                name={field.name}
                                                ref={field.ref}
                                                onBlur={field.onBlur}
                                                value={String(field.value ?? 3)}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                                className="ml-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="1" id="option-one" />
                                                    <Label htmlFor="option-one">Ativo</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="2" id="option-two" />
                                                    <Label htmlFor="option-two">Inativo</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="3" id="option-three" />
                                                    <Label htmlFor="option-three">Ambos</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row items-center gap-2 w-full">
                                <Button type="button" variant="outline" onClick={handleClear}>Limpar</Button>
                                <Button type="submit">Buscar</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </SheetContent>
        </Sheet>
    );
};

export default FuncionariosSearch;