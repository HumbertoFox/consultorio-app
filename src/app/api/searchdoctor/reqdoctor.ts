'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function SearchDoctor(formData: FormData) {
    const cpf = formData.get('cpf') as string;

    try {
        if (!cpf) {
            return { status: 400, Error: true, message: 'CPF Não encontrado!' }
        };

        const doctor = await prisma.doctor.findFirst({
            where: { cpf },
            include: {
                doctor_crm: true,
                doctor_cpf: true,
                doctor_telephone: true,
                doctor_address: {
                    include: {
                        address_zipcode: true
                    }
                }
            }
        });

        if (!doctor) {
            return { status: 400, Error: true, message: 'Doutor(a) Não encontrado!' }
        };

        const listdoctor = {
            crm: doctor.crm,
            cpf: doctor.cpf,
            name: doctor.doctor_cpf.name,
            dateofbirth: doctor.doctor_cpf.dateofbirth,
            telephone: doctor.doctor_telephone.telephone,
            email: doctor.doctor_telephone.email,
            address_id: doctor.address_id,
            zipcode: doctor.doctor_address.zipcode,
            street: doctor.doctor_address.address_zipcode.street,
            district: doctor.doctor_address.address_zipcode.district,
            city: doctor.doctor_address.address_zipcode.city,
            residencenumber: doctor.doctor_address.residencenumber,
            typeresidence: doctor.doctor_address.typeresidence,
            building: doctor.doctor_address.building,
            buildingblock: doctor.doctor_address.buildingblock,
            apartment: doctor.doctor_address.apartment
        };

        return { status: 200, Error: false, message: 'Doutor(a) encontrado!', listdoctor };
    } catch (Error) {
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};