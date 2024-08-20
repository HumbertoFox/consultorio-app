'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchPatient(formData: FormData) {
    const cpf = formData.get('cpf')?.toString();

    if (!cpf) {
        return { status: 400, Error: true, message: 'CPF Não encontrado!' }
    };

    const patient = await prisma.patients.findFirst({
        where: { cpf },
        include: {
            cpfs: true,
            addresss: {
                include: {
                    zipcodes: true
                }
            },
            telephones: true,
            consultations: true
        }
    });

    if (!patient) {
        return { status: 400, Error: true, message: 'Paciente Não encontrado!' }
    } else {
        const listpatient = {
            cpf: patient.cpf,
            name: patient.cpfs.name,
            dateofbirth: patient.cpfs.dateofbirth,
            telephone: patient.telephone,
            email: patient.telephones.email,
            address_id: patient.address_id,
            zipcode: patient.addresss.zipcode,
            street: patient.addresss.zipcodes.street,
            district: patient.addresss.zipcodes.district,
            city: patient.addresss.zipcodes.city,
            plan: patient.consultations[0].plan,
            residencenumber: patient.addresss.residencenumber,
            building: patient.addresss.building,
            buildingblock: patient.addresss.buildingblock,
            apartment: patient.addresss.apartment,
            observation: patient.consultations[0].observation
        };

        return { status: 200, Error: false, message: 'Paciente encontrado!', listpatient };
    };
};