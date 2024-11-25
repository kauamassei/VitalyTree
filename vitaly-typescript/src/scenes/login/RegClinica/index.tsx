import React, { useState } from 'react';
import "@/scenes/login/RegClinica/clinica.css";
import { FaUserMd, FaBullhorn, FaTabletAlt } from 'react-icons/fa'; // Importando ícones
import { Link, useNavigate } from 'react-router-dom';

import { useToast } from "@/hooks/use-toast"
import logo from '../../../assets/LogoVitalytree.svg';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z
        .string({
            message: "Por favor escreva seu email"
        })
        .email({
            message: "Por favor escreva um email valido"
        }),
    name: z.string({
        message: "Por favor escreva seu nome"
    }),
    password: z.string({
        message: "Por favor escreva uma senha"
    }),
    cep: z.string({
        message: "Por favor escreva seu cep"
    }),
    cnpj: z.string({
        message: "Por favor escreva seu cnpj"
    }),
    phone: z.string({
        message: "Por favor escreva seu numero de telefone"
    }),
})

const ClinicaRegister: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof formSchema>) {
        registrarClinica(values)
    }

    const navigate = useNavigate();  // Hook para navegação

    const registrarClinica = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('http://localhost:3001/regClinica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            // Não exibir alertas no frontend
            if (response.ok) {
                console.log('Registro concluído com sucesso');
                toast({
                    title: `${values.name} foi registrado com sucesso`,
                })

                // Salvar os dados no localStorage
                localStorage.setItem('clinicaData', JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    cnpj: values.cnpj,
                }));

                // Redirecionar para a página de perfil
                navigate('/perfil');
            } else {
                // Logar a mensagem de erro no console do frontend
                const data = await response.json();
                console.error('Erro ao registrar:', data.message);
                toast({
                    title: `Error`,
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: `Error`,
                variant: "destructive",
            })
            console.error('Erro de conexão:', error);
        }
    };

    return (
        <div className="bg-auth bg-center bg-no-repeat bg-cover min-h-screen w-full flex items-center justify-center">
            <div className='max-w-[800px] bg-slate-50 rounded-lg drop-shadow-md overflow-hidden  w-full'>

                <section className='px-8 py-6  flex flex-col justify-center items-center'>
                    <img src={logo} className='h-24 w-auto' />
                    <span className="w-full text-lg text-center font-bold">Cadastro de Hospital ou Clínica </span>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4">
                            <div className="grid sm:grid-cols-2 gap-6  w-full ">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem  >
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem  >
                                            <FormControl>
                                                <Input placeholder="Nome" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cep"
                                    render={({ field }) => (
                                        <FormItem  >
                                            <FormControl>
                                                <Input placeholder="Cep" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem  >
                                            <FormControl>
                                                <Input placeholder="Telefone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cnpj"
                                    render={({ field }) => (
                                        <FormItem  >
                                            <FormControl>
                                                <Input placeholder="CNPJ" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem  >
                                            <FormControl>
                                                <Input placeholder="Senha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className='w-full bg-primary-300'>Registrar</Button>
                            <span className="text">Já possui uma conta? <Link to={'/login'} className='hover:text-primary-200'>Clique Aqui</Link></span>
                        </form>
                    </Form>
                </section>

            </div>
        </div>
    );
};

export default ClinicaRegister;
