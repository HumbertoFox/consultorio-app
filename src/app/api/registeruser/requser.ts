'use server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function RegisterUser(formData: FormData) {
    const cpf = formData.get('cpf') as string;
    const name = formData.get('name') as string;
    const dateofbirth = formData.get('dateofbirth') as string;
    const telephone = formData.get('telephone') as string;
    const email = formData.get('email') as string;
    const zipcode = formData.get('zipcode') as string;
    const residencenumber = formData.get('residencenumber') as string;
    const street = formData.get('street') as string;
    const district = formData.get('district') as string;
    const city = formData.get('city') as string;
    const building = formData.get('building') as string;
    const buildingblock = formData.get('buildingblock') as string;
    const apartment = formData.get('apartment') as string;
    const password = formData.get('password') as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.users.findFirst({
        where: { cpf }
    });

    const existingCpf = await prisma.cpfs.findFirst({
        where: { cpf }
    });

    if (existingUser) {
        return { status: 400, Error: true, message: 'Usuário já cadastrado !' };
    };

    if (!existingCpf) {
        await prisma.cpfs.create({
            data: { cpf, name, dateofbirth }
        });
    };

    const existingTelephone = await prisma.telephones.findFirst({
        where: { telephone }
    });

    if (!existingTelephone) {
        await prisma.telephones.create({
            data: { telephone, email }
        });
    };

    const existingZipcode = await prisma.zipcodes.findUnique({
        where: { zipcode }
    });

    if (!existingZipcode) {
        await prisma.zipcodes.create({
            data: { zipcode, street, district, city }
        });
    };

    const newAddress = await prisma.addresss.create({
        data: {
            zipcode,
            residencenumber,
            building,
            buildingblock,
            apartment
        }
    });

    await prisma.users.create({
        data: {
            cpf: cpf,
            telephone: telephone,
            password: hashedPassword,
            address_id: newAddress.address_id
        }
    });

    return { status: 200, Error: false, message: 'Usuário Cadastrado com Sucesso!' }
};