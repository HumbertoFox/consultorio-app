'use server';

import { Consultationstatus, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function UpdateConsultationStatus(consultId: number, newStatus: string) {
    try {
        const status = newStatus as Consultationstatus;
        const statuscosultation = await prisma.consultation.update({
            where: { consultation_id: consultId },
            data: { status }
        });

        return { status: 200, Error: false, message: 'Consultas encontrada!', statuscosultation };
    } catch (error) {
        console.error('Erro ao atualizar o status da consulta:', error);
        
        return { status: 400, Error: true, message: 'Consultas Não encontrada!' };
    } finally {
        await prisma.$disconnect();
    };
};