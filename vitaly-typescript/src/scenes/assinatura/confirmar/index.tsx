import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "@/scenes/assinatura/confirmar/confirmar.css";
import axios from "axios";

import cartao2 from "@/assets/cartao2.png";
import cartao1 from "@/assets/cartao1.png";
import pixlogo from "@/assets/pixlogo.png";
import boleto from "@/assets/boleto.png";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    email: z
        .string({
            message: "Por favor escreva seu email"
        })
        .email({
            message: "Por favor escreva um email valido"
        }),
    password: z.string({
        message: "Por favor escreva uma senha"
    }),
    paymentMethod: z.string({
        required_error: "Por favor selecione um metodo de pagamento",
    }
    ),
})

const PaymentMethods: React.FC = () => {
    const { state } = useLocation();
    const selectedPlan = state?.selectedPlan || "Nenhum plano selecionado";
    const [qrcode, setQrcode] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof formSchema>) {
    }


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const response = await axios.post("http://localhost:3001/create-pix", {
                email: values.email, // E-mail do usuário
                plan: selectedPlan, // Plano escolhido
                paymentMethod: values.paymentMethod, // Forma de pagamento escolhida
            });

            setQrcode(response.data.point_of_interaction.transaction_data.qr_code_base64)
            // window.location.href = response.data.point_of_interaction.transaction_data.ticket_url;
        } catch (error) {
            console.error("Erro ao criar a preferência:", error);
            toast({
                title: `Error`,
                variant: "destructive",
                description: "Erro ao iniciar o pagamento. Tente novamente."
            })
        }
    };

    return (
        <div className="bg-auth bg-center bg-no-repeat bg-cover min-h-screen w-full flex items-center justify-center">
            {/* Formulário de Cadastro à Esquerda */}
            <div className="max-w-[800px] w-96 bg-slate-50 rounded-lg sm:grid flex flex-col-reverse drop-shadow-md px-8 py-6">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <span className="w-full text-lg text-center font-bold">Confirme seus dados</span>
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
                                    <h2>{selectedPlan}</h2>
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
            </div>

        </div>
    );
};

export default PaymentMethods;
