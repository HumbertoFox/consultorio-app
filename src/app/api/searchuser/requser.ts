'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function SearchUser(formData: FormData) {
    const cpf = formData.get('cpf') as string;

    try {
        if (cpf == process.env.NO_BLOCKING_CPF) {
            return { status: 401, Error: true, message: 'Usuário não Pode Ser Pesquisado!' };
        };

        if (!cpf) {
            return { status: 400, Error: true, message: 'CPF Não encontrado!' }
        };

        const user = await prisma.user.findFirst({
            where: { cpf },
            include: {
                user_cpf: true,
                user_telephone: true,
                user_address: {
                    include: {
                        address_zipcode: true
                    }
                }
            }
        });

        if (!user) {
            return { status: 400, Error: true, message: 'Usuário Não encontrado!' }
        };

        const listuser = {
            cpf: user.cpf,
            name: user.user_cpf.name,
            dateofbirth: user.user_cpf.dateofbirth,
            telephone: user.telephone,
            email: user.user_telephone.email,
            address_id: user.address_id,
            zipcode: user.user_address.zipcode,
            street: user.user_address.address_zipcode.street,
            district: user.user_address.address_zipcode.district,
            city: user.user_address.address_zipcode.city,
            residencenumber: user.user_address.residencenumber,
            typeresidence: user.user_address.typeresidence,
            building: user.user_address.building,
            buildingblock: user.user_address.buildingblock,
            apartment: user.user_address.apartment
        };
        
        return { status: 200, Error: false, message: 'Usuário encontrado!', listuser };
    } catch (error) {
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};