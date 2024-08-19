'use server';
import AuthService from '@/services/authservice';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function login(formData: FormData) {
    const cpf = formData.get('cpf')?.toString();
    const password = formData.get('password')?.toString();

    if (!cpf || !password) {
        throw new Error('CPF e senha são obrigatórios.');
    };

    const user = await prisma.users.findFirst({
        where: { cpf }
    });

    if (!user) {
        throw new Error('Usuário ou senha invalido!');
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Usuário ou senha invalido!');
    };

    const user_telephone = await prisma.telephones.findFirst({
        where: { telephone: user.telephone }
    });

    await AuthService.createSessionToken({ sub: user.user_id, email: user_telephone?.email, password: user.password });

    return { message: 'Login realizado com sucesso', userId: user.user_id };
};