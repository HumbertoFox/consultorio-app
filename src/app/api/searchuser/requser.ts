'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchUser(formData: FormData) {
    const cpf = formData.get('cpf')?.toString();

    if (!cpf) {
        return { status: 400, Error: true, message: 'CPF Não encontrado!' }
    };

    const user = await prisma.users.findFirst({
        where: { cpf },
        include: {
            cpfs: true,
            telephones: true,
            addresss: {
                include: {
                    zipcodes: true
                }
            }
        }
    });

    if (!user) {
        return { status: 400, Error: true, message: 'Usuário Não encontrado!' }
    } else {
        const listuser = {
            records: {
                cpf: user.cpf,
                name: user.cpfs.name,
                dateofbirth: user.cpfs.dateofbirth,
                telephone: user.telephone,
                email: user.telephones.email,
                password: user.password,
                address_id: user.address_id,
                zipcode: user.addresss.zipcode,
                street: user.addresss.zipcodes.street,
                district: user.addresss.zipcodes.district,
                city: user.addresss.zipcodes.city,
                residencenumber: user.addresss.residencenumber,
                building: user.addresss.building,
                buildingblock: user.addresss.buildingblock,
                apartment: user.addresss.apartment
            }
        };

        return { status: 200, Error: false, message: 'Usuário encontrado!', listuser };
    };
};