'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchConsults(crm: string) {

    const consultation = await prisma.consultations.findMany({
        include: {
            cpfs: true
        },
        where: { crm }
    });

    if (consultation.length === 0) {
        return { status: 400, Error: true, message: 'Consultas Não encontrada!' }
    } else {
        const listconsultation = await Promise.all(consultation.map((consult: any) => {
            return {
                id: consult.consultation_id,
                crm: consult.crm,
                cpf: consult.cpf,
                name: consult.cpfs.name,
                plan: consult.plan,
                start: consult.consultdatestart
            };
        }));

        return { status: 200, Error: false, message: 'Consultas encontrada!', listconsultation };
    };
};