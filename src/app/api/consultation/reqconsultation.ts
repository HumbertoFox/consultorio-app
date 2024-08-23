'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchConsults(crm: string) {

    const consultation = await prisma.consultation.findMany({
        where: { crm },
        include: { consultation_cpf: true }
    });

    if (consultation.length === 0) {
        return { status: 400, Error: true, message: 'Consultas Não encontrada!' }
    } else {
        const listconsultation = await Promise.all(consultation.map((consult: any) => {
            return {
                id: consult.consultation_id,
                crm: consult.crm,
                cpf: consult.cpf,
                name: consult.consultation_cpf.name,
                covenant: consult.covenant,
                start: consult.consultdatestart
            };
        }));

        return { status: 200, Error: false, message: 'Consultas encontrada!', listconsultation };
    };
};