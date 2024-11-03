'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function SearchPatient(formData: FormData) {
    const cpf = formData.get('cpf') as string;

    try {
        if (!cpf) {
            return { status: 400, Error: true, message: 'CPF Não encontrado!' }
        };

        const latestConsultation = await prisma.consultation.findFirst({
            where: { cpf },
            orderBy: { consultdatestart: 'desc' },
            select: { consultdatestart: true }
        });

        let isLastConsultationOld = false;
        if (latestConsultation) {
            const lastConsultationDate = new Date(latestConsultation.consultdatestart);
            const currentDate = new Date();
            const daysDifference = Math.floor((currentDate.getTime() - lastConsultationDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDifference <= 30) {
                isLastConsultationOld = true;
            };
        };

        const patient = await prisma.patient.findFirst({
            where: { cpf },
            include: {
                patient_cpf: true,
                parient_address: {
                    include: { address_zipcode: true }
                },
                patient_telephone: true,
                patient_consultation: true
            }
        });

        if (!patient) {
            return { status: 400, Error: true, message: 'Paciente Não encontrado!' }
        };

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
            typeresidence: patient.parient_address.typeresidence,
            building: patient.parient_address.building,
            buildingblock: patient.parient_address.buildingblock,
            apartment: patient.parient_address.apartment,
            crm: patient.patient_consultation[0].crm,
            typeservice: patient.patient_consultation[0].typeservice,
            covenant: patient.patient_consultation[0].covenant,
            particular: patient.patient_consultation[0].particular,
            courtesy: patient.patient_consultation[0].courtesy,
            observation: patient.patient_consultation[0].observation,
            isLastConsultationOld
        };
        
        return { status: 200, Error: false, message: 'Paciente encontrado!', listpatient };
    } catch (Error) {
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};