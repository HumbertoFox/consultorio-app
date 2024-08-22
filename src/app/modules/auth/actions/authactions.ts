'use server';
import { createSessionToken } from '@/services/createtoken';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function loginAuth(formData: FormData) {
    const cpf = formData.get('cpf') as string;
    const password = formData.get('password') as string;

    if (!cpf || !password) {
        return { status: 400, Error: true, message: 'CPF e senha são obrigatórios!' };
    };

    const user = await prisma.users.findFirst({
        where: { cpf }
    });

    if (!user) {
        return { status: 400, Error: true, message: 'Usuário ou senha invalido!' };
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return { status: 400, Error: true, message: 'Usuário ou senha invalido!' }
    };

    const user_telephone = await prisma.telephones.findFirst({
        where: { telephone: user.telephone }
    });

    await createSessionToken({ sub: user.user_id, email: user_telephone?.email, password: user.password });

    return { status: 200, Error: false, message: 'Login realizado com sucesso', userId: user.user_id };
};