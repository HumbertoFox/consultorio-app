'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function AgendaPacient() {
    try {
        const consultations = await prisma.consultation.findMany({
            where: { status: 'Confirmada' },
            include: {
                consultation_cpf: true,
                consultation_crm: true,
                consultation_patient: true
            }
        });

        const listConsults = await Promise.all(consultations.map(async (consultation) => {
            return {
                id: consultation.consultation_id,
                title: consultation.cpf,
                name: consultation.consultation_cpf.name,
                telephone: consultation.consultation_patient.telephone,
                start: consultation.consultdatestart,
                end: consultation.consultdateend,
                desc: consultation.crm,
                covenant: consultation.covenant,
                observation: consultation.observation,
                returnconsult: consultation.returnconsult,
                status: consultation.status
            };
        }));

        return { status: 200, Error: false, message: 'Doutor(a) Editado(a) com Sucesso!', listConsults };
    } catch (Error) {
        console.error(Error);
        
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};