'use server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function SearchConsults(crm: string) {
    if (!crm || typeof crm !== 'string') {
        return { status: 400, Error: true, message: 'CRM inválido!' };
    };

    try {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, -1).toISOString();
        const consultation = await prisma.consultation.findMany({
            where: {
                crm,
                consultdatestart: {
                    gte: todayStart,
                    lte: todayEnd
                }
            },
            include: { consultation_cpf: true }
        });

        if (consultation.length === 0) {
            return { status: 204, Error: false, message: 'Nenhuma Consulta para hoje!' };
        };

        const listconsultation = await Promise.all(consultation.map((consult: any) => {
            return {
                id: consult.consultation_id,
                crm: consult.crm,
                cpf: consult.cpf,
                name: consult.consultation_cpf.name,
                returnconsult: consult.returnconsult,
                covenant: consult.covenant,
                start: consult.consultdatestart,
                status: consult.status
            };
        }));

        return { status: 200, Error: false, message: 'Consultas encontrada!', listconsultation };
    } catch (Error) {
        console.error(Error);
        
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};