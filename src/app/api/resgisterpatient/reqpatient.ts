'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function RegisterPatient(formData: FormData) {
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

    try {
        const existingPatient = await prisma.patient.findFirst({
            where: { cpf }
        });

        if (existingPatient) {
            return { status: 400, Error: true, message: 'Paciente já cadastrado!' };
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

        await prisma.patient.create({
            data: { cpf, telephone, address_id: existingAddress.address_id }
        });

        return { status: 201, Error: false, message: 'Paciente Cadastrado com Sucesso!' };
    } catch (Error) {
        console.error(Error);
        
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};