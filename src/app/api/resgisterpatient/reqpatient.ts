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
    const street = formData.get('street') as string;
    const district = formData.get('district') as string;
    const city = formData.get('city') as string;
    const building = formData.get('building') as string;
    const buildingblock = formData.get('buildingblock') as string;
    const apartment = formData.get('apartment') as string;

    const existingPatient = await prisma.patients.findFirst({
        where: { cpf }
    });

    if (existingPatient) {
        return { status: 400, Error: true, message: 'Paciente já cadastrado !' };
    };

    const existingCpf = await prisma.cpfs.findFirst({
        where: { cpf }
    });

    if (!existingCpf) {
        await prisma.cpfs.create({
            data: { cpf, name, dateofbirth }
        });
    };

    const existingTelephone = await prisma.telephones.findUnique({
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

    let addressId = await prisma.addresss.findFirst({
        where: { zipcode, residencenumber, building, buildingblock, apartment },
        select: { address_id: true }
    });

    if (!addressId) {
        const newAddress = await prisma.addresss.create({
            data: { zipcode, residencenumber, building, buildingblock, apartment }
        });
        addressId = newAddress;
    };

    await prisma.patients.create({
        data: { cpf, telephone, address_id: addressId.address_id }
    });

    return { status: 200, Error: false, message: 'Paciente Cadastrado com Sucesso!' };
};