'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DeleteUser(formData: FormData) {
    const cpf = formData.get('cpf') as string;
    try {
        const existingUser = await prisma.user.findFirst({
            where: { cpf }
        });

        if (!existingUser) {
            return { status: 404, Error: true, message: 'Usuário não Encontrado!' };
        };

        await prisma.user.delete({
            where: { user_id: existingUser.address_id }
        });

        return { status: 200, Error: false, message: 'Usuário Excluido com Sucesso!' };
    } catch (Error) {
        console.error(Error);
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    };
};