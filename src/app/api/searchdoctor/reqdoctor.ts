'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchDoctor(formData: FormData) {
    const cpf = formData.get('cpf')?.toString();

    if (!cpf) {
        return { status: 400, Error: true, message: 'CPF Não encontrado!' }
    };

    const doctor = await prisma.doctors.findFirst({
        where: { cpf },
        include: {
            crms: true,
            cpfs: true,
            telephones: true,
            addresss: {
                include: {
                    zipcodes: true
                }
            }
        }
    });

    if (!doctor) {
        return { status: 400, Error: true, message: 'Doutor(a) Não encontrado!' }
    } else {
        const listdoctor = {
            records: {
                crm: doctor.crm,
                cpf: doctor.cpf,
                name: doctor.cpfs.name,
                dateofbirth: doctor.cpfs.dateofbirth,
                telephone: doctor.telephone,
                email: doctor.telephones.email,
                address_id: doctor.address_id,
                zipcode: doctor.addresss.zipcode,
                street: doctor.addresss.zipcodes.street,
                district: doctor.addresss.zipcodes.district,
                city: doctor.addresss.zipcodes.city,
                residencenumber: doctor.addresss.residencenumber,
                building: doctor.addresss.building,
                buildingblock: doctor.addresss.buildingblock,
                apartment: doctor.addresss.apartment
            }
        };

        return { status: 200, Error: false, message: 'Doutor(a) encontrado!', listdoctor };
    };
};