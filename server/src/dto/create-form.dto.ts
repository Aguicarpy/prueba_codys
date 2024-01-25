// Los tipos de parametros esperados para la inserción a la tabla
export class CreateFormDto {
    profile: string;
    fullname: string;
    email: string;
    phone: number;
    birthday: Date;
}
