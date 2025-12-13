import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Funcionario, FuncionarioRequest } from '@/types/funcionario';
import { funcionariosService } from '@/services/funcionariosService';
import { toast } from 'sonner';
import { formatErrorMessages } from '@/utils/formatErrors';

const formSchema = z.object({
    nome: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }).max(50, { message: "Nome deve ter no máximo 50 caracteres." }),
    sobrenome: z.string().min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres." }).max(50, { message: "Sobrenome deve ter no máximo 50 caracteres." }),
    cpf: z.string().length(11, { message: "CPF deve ter exatamente 11 caracteres." }),
    cargo: z.string().min(2, { message: "Cargo deve ter pelo menos 2 caracteres." }).max(50, { message: "Cargo deve ter no máximo 50 caracteres." }),
    ativo: z.boolean(),
})

type Props = {
    funcionario?: Funcionario;
};

const FuncionariosForm: React.FC<Props> = ({ funcionario }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            sobrenome: "",
            cpf: "",
            cargo: "",
            ativo: true,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const body = values as FuncionarioRequest;

        if (funcionario) {
            // update
        } else {
            funcionariosService.create(body).then((data) => {
                console.log('Funcionário criado com sucesso:', data);
                form.reset();
            }).catch((error) => {
                toast.error(formatErrorMessages(error.response.data));
            });
        }

    }

    const handleClose = () => {
        form.reset();
    };

    return (
        <Dialog onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <Button className='border-2 bg-yellow-500'>Criar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Funcionário</DialogTitle>
                </DialogHeader>
                <DialogClose asChild>
                    <XIcon className="absolute top-4 right-4 size-4 cursor-pointer hover:opacity-80" />
                </DialogClose>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Informe o nome" {...field} />
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
                                        <Input placeholder="Informe o sobrenome" {...field} />
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
                                            value={field.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
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
                                        <Input placeholder="Informe o cargo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ativo"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center">
                                    <FormControl>
                                        <input type="checkbox" checked={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="mt-0!">Ativo</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Salvar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default FuncionariosForm;