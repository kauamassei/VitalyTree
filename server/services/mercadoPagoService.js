import MercadoPago from "mercadopago";

//MercadoPago.configurations.setAccessToken("TEST-7014999298970403-112015-bf1dd8bf1281805ed6344d08b16f19e9-2031127060");

async function createPreference(email, plan, paymentMethod) {

    // Criação do objeto de preferência
    const preference = {
        items: [
            {
                title: plan,
                unit_price: 150, // O valor do plano (substitua pelo valor real)
                quantity: 1,
            },
        ],
        payer: {
            email: email, // O e-mail do usuário
        },
        payment_methods: {
            excluded_payment_types: [
                { id: "ticket" }, // Excluindo algumas formas de pagamento, se necessário
            ],
            installments: 1, // Defina o número de parcelas (caso haja)
        },
        back_urls: {
            success: "http://localhost:5173/sucesso",
            failure: "http://localhost:5173/falha",
            pending: "http://localhost:5173/pendente",
        },
        notification_url: "http://localhost:3000/notification", // URL de notificação para o Mercado Pago
    };

    try {
        const preferenceResponse = await MercadoPago.preferences.create(preference);
        const init_point = preferenceResponse.body.init_point; // URL para o checkout

        return init_point
    } catch (error) {
        throw error
    }

}

export {
    createPreference
}
