'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchPatient(formData: FormData) {
    const cpf = formData.get('cpf') as string;

    if (!cpf) {
        return { status: 400, Error: true, message: 'CPF Não encontrado!' }
    };

    const patient = await prisma.patient.findFirst({
        where: { cpf },
        include: {
            patient_cpf: true,
            parient_address: {
                include: {
                    address_zipcode: true
                }
            },
            patient_telephone: true,
            patient_consultation: true
        }
    });

    if (!patient) {
        return { status: 400, Error: true, message: 'Paciente Não encontrado!' }
    } else {
        const listpatient = {
            cpf: patient.cpf,
            name: patient.patient_cpf.name,
            dateofbirth: patient.patient_cpf.dateofbirth,
            telephone: patient.telephone,
            email: patient.patient_telephone.email,
            address_id: patient.address_id,
            zipcode: patient.parient_address.zipcode,
            street: patient.parient_address.address_zipcode.street,
            district: patient.parient_address.address_zipcode.district,
            city: patient.parient_address.address_zipcode.city,
            residencenumber: patient.parient_address.residencenumber,
            building: patient.parient_address.building,
            buildingblock: patient.parient_address.buildingblock,
            apartment: patient.parient_address.apartment,
        };

        return { status: 200, Error: false, message: 'Paciente encontrado!', listpatient };
    };
};