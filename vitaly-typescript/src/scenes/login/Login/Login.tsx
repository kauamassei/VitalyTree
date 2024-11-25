import React from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@/firebase'; // Ajuste o caminho conforme necessário
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import video from '../../../LoginAssets/video.mp4';
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
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    email: z
        .string({
            message: "Por favor escreva seu email"
        })
        .email({
            message: "Por favor escreva um email valido"
        }),
    senha: z.string({
        message: "Por favor escreva uma senha"
    }),
})

const Login: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof formSchema>) {
        loginUser(values)
    }

    const navigateTo = useNavigate();

    const loginUser = async (values: z.infer<typeof formSchema>) => {

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const userData = await response.json();
                // Armazenando dados no localStorage para uso na tela de perfil
                toast({
                    title: `${userData.nome} Logado com sucesso`,
                })

                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("clinicaData", JSON.stringify({
                    id: userData.id_usuario,
                    name: userData.nome,
                    email: userData.email,
                }));
                navigateTo('/perfil'); // Redireciona para a tela de perfil
            } else {
                console.log("Erro: Email ou senha inválidos");
                alert("Email ou senha inválidos");
                toast({
                    title: `Error`,
                    variant: "destructive",
                    description: "Email ou senha inválidos"
                })
            }
        } catch (error) {
            console.error("Erro ao tentar realizar login:", error);
            alert("");
            toast({
                title: `Error`,
                variant: "destructive",
                description: "Erro ao tentar realizar login. Tente novamente mais tarde."
            })
        }
    };


    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userData", JSON.stringify({
                name: user.displayName,
                photo: user.photoURL,
                email: user.email
            }));

            navigateTo('/perfil');
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error);
        }
    };

    return (
        <div className=" relative bg-auth bg-center bg-no-repeat bg-cover min-h-screen w-full flex items-center justify-center">
            <div className=' z-10 max-w-[800px] bg-slate-50/50 rounded-lg drop-shadow-md backdrop-blur-sm'>
                <section className='px-8 py-6 flex flex-col items-center justify-center w-full'>
                    <img src={logo} className='h-24 w-auto' />
                    <span className="w-full text-lg text-center font-bold mb-2">Bem vindo de volta!</span>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                name="senha"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Senha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className='w-full bg-primary-300'>Log in</Button>
                            <Button className='w-full bg-primary-300'
                                onClick={loginWithGoogle}
                            >Log in com Google</Button>
                            <div className="flex flex-col">
                                <span className="text">Não possui uma conta? <Link to={'/options'} className='hover:text-primary-200'>Cadastre-se</Link></span>
                                <span className="text">Esqueceu sua senha? <Link to={'/options'} className='hover:text-primary-200' >Clique Aqui</Link></span>
                            </div>

                        </form>
                    </Form>
                </section>

            </div>
            <video src={video} autoPlay muted loop className='absolute h-[550px] z-0 w-[500px] object-cover rounded-lg  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></video>
        </div>
    );
};

export default Login;
