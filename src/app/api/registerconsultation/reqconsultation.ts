'use server';

import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/api/modules/actions/opentoken';
const prisma = new PrismaClient();

export async function RegisterConsultation(formData: FormData) {
    const sessionCookies = (await cookies()).get('sessionAuthToken');
    let userCpf: string | any;

    if (sessionCookies) {
        const { value } = sessionCookies;
        const tokenPayload = await openSessionToken(value);

        if (tokenPayload) {
            userCpf = tokenPayload.cpf;
        };
    };

    const existingUser = await prisma.user.findFirst({
        where: { cpf: userCpf }
    });

    if (!existingUser) {
        return { status: 401, Error: true, message: 'Usuário não autenticado!' };
    };

    const cpf = formData.get('cpf') as string;
    const name = formData.get('name') as string;
    const dateofbirth = formData.get('dateofbirth') as string;
    const telephone = formData.get('telephone') as string;
    const email = formData.get('email') as string;
    const zipcode = formData.get('zipcode') as string;
    const residencenumber = formData.get('residencenumber') as string;
    const typeresidence = formData.get('typeresidence') as string;
    const street = formData.get('street') as string;
    const district = formData.get('district') as string;
    const city = formData.get('city') as string;
    const building = formData.get('building') as string;
    const buildingblock = formData.get('buildingblock') as string;
    const apartment = formData.get('apartment') as string;
    const crm = formData.get('crm') as string;
    const consultdatestart = formData.get('consultdatestart') as string;
    const consultdateend = formData.get('consultdateend') as string;
    const observation = formData.get('observation') as string;
    const typeservice = formData.get('typeservice') as string;
    const returnconsult = formData.get('returnconsult') as string;
    const covenant = formData.get('covenant') as string;
    const courtesy = formData.get('courtesy') as string;
    const particular = formData.get('particular') as string;
    const returnConsultValue = returnconsult === null ? 'Não' : returnconsult;

    try {
        const existingDoctor = await prisma.doctor.findFirst({ where: { crm } });
        if (!existingDoctor) {
            return { status: 400, Error: true, message: 'Doutor não Cadastrado!' };
        };

        let existingPatient = await prisma.patient.findFirst({ where: { cpf } });
        const existingConsultation = await prisma.consultation.findFirst({
            where: {
                crm, status: { in: ['Confirmar', 'Confirmada'] },
                OR: [{
                    consultdatestart: { lte: consultdatestart },
                    consultdateend: { gte: consultdateend }
                }]
            }
        });

        if (existingConsultation) {
            return { status: 400, Error: true, message: 'Horário da Consulta já Agendado!' };
        };

        if (!existingPatient) {
            const existingCpf = await prisma.cpf.findUnique({
                where: { cpf }
            });

            if (!existingCpf) {
                await prisma.cpf.create({
                    data: { cpf, name, dateofbirth }
                });
            };

            const existingTelephone = await prisma.telephone.findUnique({
                where: { telephone }
            });

            if (!existingTelephone) {
                await prisma.telephone.create({
                    data: { telephone, email }
                });
            };

            const existingZipcode = await prisma.zipcode.findUnique({
                where: { zipcode }
            });

            if (!existingZipcode) {
                await prisma.zipcode.create({
                    data: { zipcode, street, district, city }
                });
            };

            let existingAddress = await prisma.address.findFirst({
                where: { zipcode, residencenumber, typeresidence, building, buildingblock, apartment }
            });

            if (!existingAddress) {
                existingAddress = await prisma.address.create({
                    data: { zipcode, residencenumber, typeresidence, building, buildingblock, apartment }
                });
            };

            existingPatient = await prisma.patient.create({
                data: { cpf, telephone, address_id: existingAddress.address_id }
            });
        };

        await prisma.consultation.create({
            data: {
                cpf,
                crm,
                typeservice,
                returnconsult: returnConsultValue,
                covenant,
                particular,
                courtesy,
                observation,
                consultdatestart,
                consultdateend,
                patient_id: existingPatient.patient_id,
                user_id: existingUser.user_id
            }
        });

        return { status: 201, Error: false, message: 'Paciente Cadastrado com Sucesso!' };
    } catch (Error) {
        console.error(Error);

        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    } finally {
        await prisma.$disconnect();
    };
};