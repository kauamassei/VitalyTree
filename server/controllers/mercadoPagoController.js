import { Router } from "express";
import { createPreference } from "../services/mercadoPagoService.js";

const mercadoPagoRouter = Router();

/**
 * @swagger
 * tags:
 *   name: MercadoPago
 *   description: Endpoints relacionados à integração com o MercadoPago
 */

/**
 * @swagger
 * /create-preference:
 *   post:
 *     summary: Criar uma preferência de pagamento no MercadoPago
 *     tags: [MercadoPago]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário que está criando a preferência
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               price:
 *                 type: number
 *                 description: Valor do pagamento
 *               description:
 *                 type: string
 *                 description: Descrição do pagamento
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pagamento escolhido pelo usuário
 *     responses:
 *       200:
 *         description: URL de redirecionamento para o pagamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 init_point:
 *                   type: string
 *                   description: URL do checkout do MercadoPago
 *       401:
 *         description: Email ou senha inválidos
 *       500:
 *         description: Erro ao criar a preferência
 */
mercadoPagoRouter.post("/create-preference", async (req, res) => {
    const { email, cpf, password, price, description, paymentMethod } = req.body;
    try {
        const pagamentoInfo = await createPreference({ email, cpf, password, price, description, paymentMethod })

        // Retorna a URL do checkout para o frontend
        return res.json(pagamentoInfo);
    } catch (error) {
        if (error.message === "USER_NOT_FOUND" || error.message === "INVALID_PASSWORD") {
            console.log(error.message === "USER_NOT_FOUND" ? "Usuário não encontrado." : "Senha incorreta.");
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        console.error("Erro ao criar a preferência:", error);
        return res.status(500).send("Erro ao criar a preferência.");
    }
});

export default mercadoPagoRouter;
