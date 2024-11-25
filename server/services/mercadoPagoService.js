import { pool } from '../lib/db.js';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"; // Install with `npm install uuid`
import { Payment, MercadoPagoConfig } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: "TEST-1455218705953845-112417-c74a5046153e4d2842016ae8d6c360d1-2031127060",
    options: { timeout: 5000, idempotencyKey: uuidv4().toString() }
});
const payment = new Payment(client);

async function createPreference({ email, cpf, password, price, description, paymentMethod }) {
    try {
        /*
        const [userResult] = await pool.query("SELECT * FROM Usuario WHERE email = ?", [email]);
        if (userResult.length === 0) {
            throw new Error("USER_NOT_FOUND");
        }

        const user = userResult[0];

        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            throw new Error("INVALID_PASSWORD");
        }
        */

        const idempotencyKey = uuidv4().toString();

        const paymentBody = {
            transaction_amount: price,
            description: description,
            payment_method_id: paymentMethod,
            payer: {
                email: email,
                identification: {
                    type: "CPF",
                    number: cpf
                }
            },
        }

        if (paymentMethod == "credito") {
            paymentBody.token = "YOUR_CARD_TOKEN"
            paymentBody.installments = 1
            paymentBody.issuer_id = "YOUR_ISSUER_ID"
        }

        return payment.create({
            body: paymentBody,
            requestOptions: { idempotencyKey }
        }).then((result) => {
            console.log(result)
            return result
        }).catch((error) => { console.error("Error creating payment:", error); throw error; });


    } catch (error) {
        throw error;
    }
}

export { createPreference };
