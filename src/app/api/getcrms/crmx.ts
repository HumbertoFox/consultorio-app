'use server';

export async function GetCrmX() {
    const CrmX = process.env.DOCTORX_CRM ?? 0;
    return CrmX;
};