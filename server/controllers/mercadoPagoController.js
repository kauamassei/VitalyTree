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
 *               plan:
 *                 type: string
 *                 description: O plano escolhido para pagamento
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
 *       500:
 *         description: Erro ao criar a preferência
 */
mercadoPagoRouter.post("/create-preference", async (req, res) => {
    const { email, plan, paymentMethod } = req.body;
    try {
        const init_point = await createPreference(email, plan, paymentMethod)

        // Retorna a URL do checkout para o frontend
        return res.json({ init_point });
    } catch (error) {
        console.error("Erro ao criar a preferência:", error);
        return res.status(500).send("Erro ao criar a preferência.");
    }
});

export default mercadoPagoRouter;
