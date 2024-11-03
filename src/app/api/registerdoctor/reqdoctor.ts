'use server';

import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/api/modules/actions/opentoken';
const prisma = new PrismaClient();

export async function RegisterDoctor(formData: FormData) {
    const sessionCookies = (await cookies()).get('sessionAuthToken');
    let userCpf: string | any;

    if (sessionCookies) {
        const { value } = sessionCookies;
        const { cpf } = await openSessionToken(value);
        userCpf = cpf;
    };

    const existingUser = await prisma.user.findFirst({
        where: { cpf: userCpf }
    });

    if (!existingUser) {
        return { status: 401, Error: true, message: 'Usuário não autenticado!' };
    };

    const cpf = formData.get('cpf') as string;
    const name = formData.get('name') as string;
    const dateofbirth = formData.get('dateofbirth') as string;
    const telephone = formData.get('telephone') as string;
    const email = formData.get('email') as string;
    const zipcode = formData.get('zipcode') as string;
    const residencenumber = formData.get('residencenumber') as string;
    const typeresidence = formData.get('typeresidence') as string;
    const street = formData.get('street') as string;
    const district = formData.get('district') as string;
    const city = formData.get('city') as string;
    const building = formData.get('building') as string;
    const buildingblock = formData.get('buildingblock') as string;
    const apartment = formData.get('apartment') as string;
    const crm = formData.get('crm') as string;
    const VALID_CRM_NUMBERS = [process.env.DOCTORY_CRM, process.env.DOCTORX_CRM];

    try {
        if (!VALID_CRM_NUMBERS.includes(crm)) {
            return { status: 400, Error: true, message: 'CRM Não Pode Ser Cadastrado!' };
        };

        const existingDoctor = await prisma.doctor.findFirst({
            where: { crm, cpf }
        });

        if (existingDoctor) {
            return { status: 400, Error: true, message: 'Doutor já cadastrado!' };
        };

        const existingCrm = await prisma.crm.findUnique({
            where: { crm }
        });

        if (!existingCrm) {
            await prisma.crm.create({
                data: { crm }
            });
        };

        const existingCpf = await prisma.cpf.findUnique({
            where: { cpf }
        });

        if (!existingCpf) {
            await prisma.cpf.create({
                data: { cpf, name, dateofbirth }
            });
        };

        const existingTelephone = await prisma.telephone.findUnique({
            where: { telephone }
        });

        if (!existingTelephone) {
            await prisma.telephone.create({
                data: { telephone, email }
            });
        };

        const existingZipcode = await prisma.zipcode.findUnique({
            where: { zipcode }
        });

        if (!existingZipcode) {
            await prisma.zipcode.create({
                data: { zipcode, street, district, city }
            });
        };

        let existingAddress = await prisma.address.findFirst({
            where: { zipcode, residencenumber, typeresidence, building, buildingblock, apartment }
        });

        if (!existingAddress) {
            existingAddress = await prisma.address.create({
                data: { zipcode, residencenumber, typeresidence, building, buildingblock, apartment }
            });
        };

        await prisma.doctor.create({
            data: {
                crm, cpf, telephone, address_id: existingAddress.address_id,
                user_id: existingUser.user_id
            }
        });

        return { status: 201, Error: false, message: 'Doutor(a) Cadastrado com Sucesso!' };
    } catch (Error) {
        console.error(Error);
        
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};