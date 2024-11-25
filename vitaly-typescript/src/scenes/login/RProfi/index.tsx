import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '@/scenes/login/RProfi/RProfi.css';

import video from '../../../LoginAssets/video.mp4';
import logo from '../../../assets/LogoVitalytree.svg';
import { useToast } from "@/hooks/use-toast"
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
import { FaUserMd, FaBullhorn, FaTabletAlt } from 'react-icons/fa';


const formSchema = z.object({
    email: z
        .string({
            message: "Por favor escreva seu email"
        })
        .email({
            message: "Por favor escreva um email valido"
        }),
    fullName: z.string({
        message: "Por favor escreva seu nome"
    }),
    password: z.string({
        message: "Por favor escreva uma senha"
    }),
    state: z.string({
        message: "Por favor escreva seu estado"
    }),
    phone: z.string({
        message: "Por favor escreva seu numero de telefone"
    }),
    specialty: z.string({
        message: "Por favor escreva seu especialidade"
    }),
    cnpj: z.string({
        message: "Por favor escreva seu cnpj"
    }),
    professionalId: z.string({
        message: "Por favor escreva seu registro de profissional"
    }),
})


const RProfi: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof formSchema>) {
        regiterProfissional(values)
    }

    const navigate = useNavigate();


    const regiterProfissional = async (value: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });

            if (response.ok) {
                toast({
                    title: `${value.fullName} foi registrado com sucesso`,
                })

                // Salvar dados do usuário no localStorage
                localStorage.setItem("userData", JSON.stringify({
                    name: value.fullName,
                    email: value.email,
                    photo: "",  // Adicione a foto aqui se disponível
                }));

                // Redirecionar para a página de perfil
                navigate("/perfil");
            } else {
                console.log('Erro no registro');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (

        <div className="bg-auth bg-center bg-no-repeat bg-cover min-h-screen w-full flex items-center justify-center">
            <div className='max-w-[800px] bg-slate-50 rounded-lg sm:grid sm:grid-cols-2 max-sm:flex max-sm:flex-col-reverse drop-shadow-md overflow-hidden '>
                <section className='px-8 py-6 '>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <span className="w-full text-lg text-center font-bold">Cadastro do Profissioanal</span>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Estado" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Telefone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Senha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="specialty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Especialidade" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cnpj"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="CNPJ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="professionalId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Registro de Profissional" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className='w-full bg-primary-300'>Registrar</Button>
                            <span className="text">Já possui uma conta? <Link to={'/login'} className='hover:text-primary-200'>Clique Aqui</Link></span>

                        </form>
                    </Form>
                </section>
                <section className='relative '>
                    <div className="absolute backdrop-blur-sm bg-white/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col px-3 py-2 rounded-lg">
                        <img src={logo} className='h-20 w-auto' />
                        <div className="flex flex-col w-[300px]">
                            <p className="w-full text-center font-bold">vantagens</p>
                            <ul>
                                <li className="flex gap-2 items-center">
                                    <FaUserMd className="benefitIcon" />
                                    <span>Contato diretamente com o paciente</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <FaBullhorn className="benefitIcon" />
                                    <span>Divulgação dos serviços do profissional</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <FaTabletAlt className="benefitIcon" />
                                    <span>Facilidade de usar a plataforma</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <video src={video} autoPlay muted loop className='h-full w-96 object-cover'></video>

                </section>
            </div>
        </div>
    );
};

export default RProfi;
