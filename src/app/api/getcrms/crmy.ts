'use server';

export async function GetCrmY() {
    const CrmY = process?.env?.DOCTORY_CRM ?? 0;
    return CrmY;
};