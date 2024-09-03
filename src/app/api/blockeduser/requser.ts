'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function BlockedUser(formData: FormData) {
    const cpf = formData.get('cpf') as string;
    const userblock = formData.get('userblock') === 'true';

    try {
        const existingUser = await prisma.user.findFirst({
            where: { cpf }
        });

        if (!existingUser) {
            return { status: 404, Error: true, message: 'Usuário não Encontrado!' };
        };

        await prisma.user.update({
            where: { user_id: existingUser.user_id },
            data: { isblocked: userblock }
        });

        return { status: 200, Error: false, message: userblock ? 'Usuário Bloqueado com Sucesso!' : 'Usuário Desbloqueado com Sucesso!' };
    } catch (Error) {
        console.error(Error);
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    };
};