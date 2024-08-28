'use server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function EditUser(formData: FormData) {
    const cpf = formData.get('cpf') as string;
    const name = formData.get('name') as string;
    const dateofbirth = formData.get('dateofbirth') as string;
    const telephone = formData.get('telephone') as string;
    const email = formData.get('email') as string;
    const zipcode = formData.get('zipcode') as string;
    const residencenumber = formData.get('residencenumber') as string;
    const street = formData.get('street') as string;
    const district = formData.get('district') as string;
    const city = formData.get('city') as string;
    const building = formData.get('building') as string;
    const buildingblock = formData.get('buildingblock') as string;
    const apartment = formData.get('apartment') as string;
    const password = formData.get('password') as string;
    try {
        const existingUser = await prisma.user.findFirst({
            where: { cpf }
        });

        if (existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const checkedCpf = await prisma.cpf.findUnique({
                where: { cpf }
            });

            const checkedTelephone = await prisma.telephone.findUnique({
                where: { telephone }
            });

            const checkedZipcode = await prisma.zipcode.findUnique({
                where: { zipcode }
            });

            let checkedAddress = await prisma.address.findFirst({
                where: { zipcode, residencenumber, building, buildingblock, apartment }
            });

            if (checkedCpf) {
                await prisma.cpf.update({
                    where: { cpf },
                    data: { name, dateofbirth }
                });
            } else {
                await prisma.cpf.create({
                    data: { cpf, name, dateofbirth }
                });
            };

            if (checkedTelephone) {
                await prisma.telephone.update({
                    where: { telephone },
                    data: { email }
                });
            } else {
                await prisma.telephone.create({
                    data: { telephone, email }
                });
            };

            if (!checkedZipcode) {
                await prisma.zipcode.create({
                    data: { zipcode, street, district, city }
                });
            };

            if (!checkedAddress) {
                checkedAddress = await prisma.address.create({
                    data: { zipcode, residencenumber, building, buildingblock, apartment }
                });
            };

            await prisma.user.update({
                where: { user_id: existingUser.address_id },
                data: { cpf, telephone, password: hashedPassword, address_id: checkedAddress.address_id }
            });

            return { status: 200, Error: false, message: 'Usuário Cadastrado com Sucesso!' };
        } else {
            return { status: 404, Error: true, message: 'Usuário não Encontrado!' };
        };
    } catch (Error) {
        console.error(Error);
        return { status: 500, Error: true, message: 'Erro interno do BD!' };
    };
};