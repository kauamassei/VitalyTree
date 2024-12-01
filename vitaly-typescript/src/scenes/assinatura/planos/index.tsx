import { useNavigate } from 'react-router-dom';
import '@/scenes/assinatura/assinatura.css';
import { Spacer  } from '@chakra-ui/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { useState } from 'react';
import axios from "axios";

import cartao2 from "@/assets/cartao2.png";
import cartao1 from "@/assets/cartao1.png";
import pixlogo from "@/assets/pixlogo.png";
import boleto from "@/assets/boleto.png";
import { useToast } from '@/hooks/use-toast';

import Navbar from '@/scenes/navbar';
import FooterAssinatura from '@/scenes/footer/footer2';

const formSchema = z.object({
    email: z
        .string({
            message: "Por favor escreva seu email"
        })
        .email({
            message: "Por favor escreva um email valido"
        }),
    cpf: z.string({
        message: "Por favor escreva seu cpf"
    }),
    password: z.string({
        message: "Por favor escreva uma senha"
    }),
    paymentMethod: z.string({
        required_error: "Por favor selecione um metodo de pagamento",
    }
    ),
})

const Planos = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [qrcode, setQrcode] = useState<string>("");
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("http://localhost:3001/create-pix", {
                email: values.email,
                cpf: values.cpf,
                password: values.password,
                description: "Assinatura Mensal - R$" + selectedPlan,
                price: parseInt(selectedPlan),
            });

            toast({
                title: "Sucesso",
                description: `${values.email}, ${values.paymentMethod}, ${selectedPlan}`
            });
            console.log(response.data);

            setQrcode(response.data.point_of_interaction.transaction_data.qr_code_base64)
            // window.location.href = response.data.point_of_interaction.transaction_data.ticket_url;
           
        } catch (error) {
            console.error("Erro ao criar a preferência:", error);
            toast({
                title: "Error",
                variant: "destructive",
                description: "Erro ao iniciar o pagamento. Tente novamente."
            });
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        handleSubmit(values);
    }

    return (
        <>
        <Navbar setSelectedPage={() => {}} />
        <div id="title">
            <h6 className='assinatura'>Escolha seu plano</h6> {/* Título atualizado */}
            <div className='containerAssinatura'>
                <Dialog>
                    {/* Card do primeiro plano */}
                    <PlanoCard
                        title="Assinatura Mensal"
                        price="150,00"
                        handlePlano={() => setSelectedPlan('150')}
                        description="Gerencie suas consultas de forma eficiente com nosso sistema de agendamento inteligente, ofereça consultas online com telemedicina integrada."
                    />

                    {/* Card do segundo plano */}
                    <PlanoCard
                        title="Assinatura Trimestral"
                        price="250,00"
                        handlePlano={() => setSelectedPlan('250')}
                        description="Gerencie suas consultas de forma eficiente com nosso sistema de agendamento inteligente, ofereça consultas online com telemedicina integrada."
                    />

                    {/* Card do terceiro plano */}

                    <PlanoCard
                        title="Assinatura Anual"
                        price="500,00"
                        handlePlano={() => setSelectedPlan('500')}
                        description="Gerencie suas consultas de forma eficiente com nosso sistema de agendamento inteligente, ofereça consultas online com telemedicina integrada."
                    />

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirme seus dados</DialogTitle>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormControl >
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormControl >
                                                    <Input placeholder="CPF" {...field} />
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
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <h2>Assinatura Mensal - R$ {selectedPlan}</h2>
                                                <h2>Escolha sua forma de pagamento</h2>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione seu metodo de pagamento" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="credito" >
                                                            <div className="flex gap-2 justify-center items-center">
                                                                <img src={cartao2} alt="credito bandeiras" className="h-4 w-auto" />
                                                                Crédito
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="debito" className="flex gap-2">
                                                            <div className="flex gap-2 justify-center items-center">
                                                                <img src={cartao1} alt="debito bandeiras" className="h-4 w-auto" />
                                                                Débito
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="pix" className="flex gap-2">
                                                            <div className="flex gap-2 justify-center items-center">
                                                                <img src={pixlogo} alt="pix logo" className="h-4 w-auto" />
                                                                Pix
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="boleto" className="flex gap-2">
                                                            <div className="flex gap-2 justify-center items-center">
                                                                <img src={boleto} alt="boleto logo" className="h-4 w-auto" />
                                                                Boleto
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className='w-full bg-primary-300'>Confirmar</Button>
                                </form>
                                <img width="100" height="100" src={`data:image/jpeg;base64,${qrcode}`}/>
                            </Form>

                        </DialogHeader>
                    </DialogContent>

                </Dialog>

            </div>
        </div>
        <FooterAssinatura setSelectedPage={() => {}} />
        </>
        
    );
    
};


const PlanoCard = ({ title, price, description, handlePlano }: { title: string, price: string, description: string, handlePlano: () => void }) => {

    return <DialogTrigger>
        <article
            className="product-details hover:cursor-pointer"
            onClick={handlePlano}
        >
            <h2>{title}</h2>
            <Spacer height="4" />
            <p>Você irá pagar</p>
            <span>R$ {price}</span>
            <Spacer height="4" />
            <p>{description}</p>
        </article>
    </DialogTrigger>
}

export default Planos;
