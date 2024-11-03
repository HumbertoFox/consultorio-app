'use server';

import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { openSessionToken } from '@/app/api/modules/actions/opentoken';
const prisma = new PrismaClient();

export async function EditDoctor(formData: FormData) {
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

    try {
        const existingdoctor = await prisma.doctor.findFirst({
            where: { cpf }
        });

        if (!existingdoctor) {
            return { status: 404, Error: true, message: 'Doutor(a) não Encontrado(a)!' };
        };

        const checkedCrm = await prisma.crm.findUnique({
            where: { crm }
        });

        const checkedCpf = await prisma.cpf.findUnique({
            where: { cpf }
        });

        const checkedTelephone = await prisma.telephone.findUnique({
            where: { telephone }
        });

        const checkedZipcode = await prisma.zipcode.findUnique({
            where: { zipcode }
        });

        let checkedAddress = await prisma.address.findFirst({
            where: { zipcode, residencenumber, typeresidence, building, buildingblock, apartment },
        });

        if (!checkedCrm) {
            await prisma.crm.create({
                data: { crm }
            });
        };

        if (checkedCpf) {
            await prisma.cpf.update({
                where: { cpf },
                data: { name, dateofbirth }
            });
        } else {
            await prisma.cpf.create({
                data: { cpf, name, dateofbirth }
            });
        };

        if (checkedTelephone) {
            await prisma.telephone.update({
                where: { telephone },
                data: { email }
            });
        } else {
            await prisma.telephone.create({
                data: { telephone, email }
            });
        };

        if (!checkedZipcode) {
            await prisma.zipcode.create({
                data: { zipcode, street, district, city }
            });
        };

        if (!checkedAddress) {
            checkedAddress = await prisma.address.create({
                data: { zipcode, residencenumber, building, typeresidence, buildingblock, apartment }
            });
        };

        await prisma.doctor.update({
            where: { doctor_id: existingdoctor.doctor_id },
            data: { crm, cpf, telephone, address_id: checkedAddress.address_id, user_id: existingUser.user_id }
        });

        return { status: 201, Error: false, message: 'Doutor(a) Editado(a) com Sucesso!' };
    } catch (Error) {
        console.error(Error);
        
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};