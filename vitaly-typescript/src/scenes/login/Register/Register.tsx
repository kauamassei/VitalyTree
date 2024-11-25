import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    email: z
    .string({
        message:"Por favor escreva seu email"
    })
    .email({
        message:"Por favor escreva um email valido"
    }),
    userName: z.string({
        message:"Por favor escreva seu nome"
    }),
    password: z.string({
        message:"Por favor escreva uma senha"
    }),
    gender: z.string({
        required_error: "Por favor selecione um opção",
    }
    ),
    address: z.string({
        message:"Por favor escreva seu endereço"
    }),
    phone: z.string({
        message:"Por favor escreva seu numero de telefone"
    }),
})

const Register = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof formSchema>) {
        createUser(values)
    }

    const createUser = ({ email, userName, password, gender, address, phone }: { email: string, userName: string, password: string, gender: string, address: string, phone: string }) => {
        Axios.post('http://localhost:3001/addUser', {
            email: email,
            userName: userName,
            password: password,
            gender: gender,      // Envia o sexo
            address: address,    // Envia o endereço
            phone: phone,        // Envia o telefone
        })
            .then((response) => {
                console.log('Resposta do servidor:', response.data.message);
                toast({
                    title: `${userName} foi registrado com sucesso`,
                    description: response.data.message
                })

                localStorage.setItem('userData', JSON.stringify({
                    name: userName,
                    email: email,
                    userId: response.data.userId, // Armazena o userId
                }));

                navigate('/perfil');
            })
            .catch((error) => {
                console.error('Erro ao registrar:', error.response ? error.response.data.message : error.message);
                toast({
                    title: `Error`,
                    variant: "destructive",
                    description: "Algo deu errado ao te registrar"
                })
            });
    };


    // Hook do React Router para navegação
    const navigate = useNavigate();

    return (
        <div className="bg-auth bg-center bg-no-repeat bg-cover min-h-screen w-full flex items-center justify-center">
            <div className='max-w-[800px] bg-slate-50 rounded-lg sm:grid sm:grid-cols-2 max-sm:flex max-sm:flex-col-reverse drop-shadow-md overflow-hidden '>
                <section className='px-8 py-6 '>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <span className="w-full text-lg text-center font-bold">Cadastro</span>
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
                                name="userName"
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
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione seu sexo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Masculino">Masculino</SelectItem>
                                                <SelectItem value="Feminino">Feminino</SelectItem>
                                                <SelectItem value="Outro">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Endereço" {...field} />
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

                            <Button type="submit" className='w-full bg-primary-300'>Registrar</Button>
                                <span className="text">Já possui uma conta? <Link to={'/login'} className='hover:text-primary-200'>Clique Aqui</Link></span>
                        </form>
                    </Form>
                </section>
                <section className='relative '>
                    <div className="absolute backdrop-blur-sm bg-white/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col px-3 py-2 rounded-lg">
                        <img src={logo} className='h-24 w-auto' />
                        <span>
                            Deixe-Nos te conhecer!
                        </span>
                    </div>

                    <video src={video} autoPlay muted loop className='h-full w-96 object-cover'></video>

                </section>
            </div>
        </div>
    );
}

export default Register;
