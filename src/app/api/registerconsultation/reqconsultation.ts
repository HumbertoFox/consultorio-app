'use server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/services/opentoken';

const prisma = new PrismaClient();

export async function RegisterConsultation(formData: FormData) {
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
    const consultdatestart = formData.get('consultdatestart') as string;
    const consultdateend = formData.get('consultdateend') as string;
    const observation = formData.get('observation') as string;
    const covenant = formData.get('covenant') as string;
    const courtesy = formData.get('courtesy') as string;
    const particular = formData.get('particular') as string;

    let existingPatient = await prisma.patient.findFirst({
        where: { cpf }
    });

    const existingConsultation = await prisma.consultation.findFirst({
        where: {
            crm,
            OR: [{
                consultdatestart: { lte: consultdatestart },
                consultdateend: { gte: consultdateend }
            }]
        }
    });

    if (existingConsultation) {
        return { status: 400, Error: true, message: 'Horário da Consulta já Agendado!' };
    };

    if (existingPatient) {
        await prisma.consultation.create({
            data: {
                cpf, crm, covenant, particular, courtesy, observation, consultdatestart, consultdateend, patient_id: existingPatient.patient_id,
                user_id: existingUser.user_id
            }
        });

        return { status: 400, Error: false, message: 'Paciente Cadastrado com Sucesso!' };
    };

    const existingCpf = await prisma.cpf.findFirst({
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

    let addressId = await prisma.address.findFirst({
        where: { zipcode, residencenumber, building, buildingblock, apartment },
        select: { address_id: true }
    });

    if (!addressId) {
        const newAddress = await prisma.address.create({
            data: { zipcode, residencenumber, building, buildingblock, apartment }
        });
        addressId = newAddress;
    };

    const newPatient = await prisma.patient.create({
        data: { cpf, telephone, address_id: addressId.address_id }
    });
    existingPatient = newPatient;

    await prisma.consultation.create({
        data: {
            cpf, crm, covenant, particular, courtesy, observation, consultdatestart, consultdateend, patient_id: existingPatient.patient_id,
            user_id: existingUser.user_id
        }
    });

    return { status: 200, Error: false, message: 'Paciente Cadastrado com Sucesso!' };
};