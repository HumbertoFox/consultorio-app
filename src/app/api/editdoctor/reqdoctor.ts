'use server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/services/opentoken';

const prisma = new PrismaClient();

export async function EditDoctor(formData: FormData) {
    const sessionCookies = cookies().get('session');

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
    const street = formData.get('street') as string;
    const district = formData.get('district') as string;
    const city = formData.get('city') as string;
    const building = formData.get('building') as string;
    const buildingblock = formData.get('buildingblock') as string;
    const apartment = formData.get('apartment') as string;
    const crm = formData.get('crm') as string;

    let doctorId = await prisma.doctor.findFirst({
        where: { crm },
        select: { doctor_id: true }
    });

    if (doctorId) {
        await prisma.crm.create({
            data: { crm }
        });
    };

    if (!doctorId) {
        const newDoctorId = await prisma.doctor.findFirst({
            where: { cpf },
            select: { doctor_id: true }
        });
        doctorId = newDoctorId;
    };

    const existingCpf = await prisma.cpf.findFirst({
        where: { cpf }
    });

    if (existingCpf) {
        await prisma.cpf.update({
            where: { cpf },
            data: { cpf, name, dateofbirth }
        });
    };

    const existingTelephone = await prisma.telephone.findUnique({
        where: { telephone }
    });

    if (existingTelephone) {
        await prisma.telephone.update({
            where: { telephone },
            data: { telephone, email }
        });
    };

    const existingZipcode = await prisma.zipcode.findUnique({
        where: { zipcode }
    });

    if (existingZipcode) {
        await prisma.zipcode.update({
            where: { zipcode },
            data: { zipcode, street, district, city }
        });
    };

    let addressId = await prisma.address.findFirst({
        where: { zipcode, residencenumber, building, buildingblock, apartment },
        select: { address_id: true }
    });

    if (addressId) {
        const newAddress = await prisma.address.update({
            where: { address_id: addressId.address_id },
            data: { zipcode, residencenumber, building, buildingblock, apartment }
        });
        addressId = newAddress;
    };

    if (doctorId) {
        await prisma.doctor.update({
            where: { doctor_id: doctorId.doctor_id },
            data: {
                crm, cpf, telephone, address_id: addressId?.address_id,
                user_id: existingUser.user_id
            }
        });
    };

    return { status: 200, Error: false, message: 'Doutor(a) Editado(a) com Sucesso!' };
};