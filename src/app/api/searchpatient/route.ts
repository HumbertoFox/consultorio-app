'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchPatient(formData: FormData) {
    const cpf = formData.get('cpf')?.toString();

    if (!cpf) {
        throw new Error('CPF é obrigatórios.');
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

    if (patient) {
        const listpatient = {
            records: {
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
            }
        };

        return { message: 'Paciente encontrado!', listpatient }
    };
};