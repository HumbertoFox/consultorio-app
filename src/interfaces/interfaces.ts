enum Returnconsult {
    yes = 'Sim',
    no = 'Não'
};
export interface InputsProps {
    cpf?: number;
    name?: string;
    dateofbirth?: number;
    telephone?: string;
    email?: string;
    zipcode?: string;
    residencenumber?: string;
    typeresidence?: string;
    street?: string;
    district?: string;
    city?: string;
    building?: string;
    buildingblock?: string;
    apartment?: string;
    crm?: number;
    consultdatestart?: string;
    consultdateend?: string;
    status?: string;
    observation?: string;
    typeservice?: string;
    returnconsult?: Returnconsult;
    covenant?: string;
    courtesy?: string;
    particular?: string;
    userblock?: string;
    password?: string;
    passwordchecked?: string;
};
export interface ConsultProps {
    id?: number;
    crm?: number;
    cpf?: string;
    name?: string;
    returnconsult?: Returnconsult;
    covenant?: string;
    start?: string;
    status?: string;
};
export interface InputsLoginProps {
    cpf: string;
    password: string;
};
export interface CalendarEventProps {
    name: string;
    telephone: string;
    returnconsult: string;
    covenant: string;
    desc: string;
    observation: string;
    start: Date;
    end: Date;
    title: string;
    status: string;
    [key: string]: any;
};
export interface InputsSearchCpfProps {
    searchcpf: number;
};
export interface CrmDoctorConsultProps {
    crm: number;
    month: boolean;
};
export interface InputsRegisterPatientProps {
    crm?: number;
    cpf?: number;
    name?: string;
    dateofbirth?: string;
    telephone?: string;
    email?: string;
    zipcode?: number;
    street?: string;
    district?: string;
    city?: string;
    residencenumber?: string;
    building?: string;
    buildingblock?: string;
    apartment?: string;
};
export interface PatDocUserSearchResultProps {
    type: 'patient' | 'doctor' | 'user';
    searchPatDocUserCpf: (patientSearch: any) => void;
};
export interface PatDocUserSearchResultFormProps {
    crm?: number;
    docpatuser: 'patient' | 'editpatient' | 'doctor' | 'editdoctor' | 'user' | 'edituser' | 'blockeduser' | 'consultation';
    buttons?: string;
    searchPatDocUserCpf: {
        cpf: number;
        name: string;
        dateofbirth: number;
        telephone: string;
        email: string;
        zipcode: string;
        residencenumber: string;
        typeresidence: string;
        street: string;
        district: string;
        city: string;
        building: string;
        buildingblock: string;
        apartment: string;
        crm: number;
        consultdatestart: string;
        consultdateend: string;
        status: string;
        observation: string;
        typeservice: string;
        returnconsult: Returnconsult;
        covenant: string;
        courtesy: string;
        particular: string;
        userblock: string;
        password: string;
    } | any;
};