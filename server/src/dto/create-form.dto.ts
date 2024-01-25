// Los tipos de parametros esperados para la inserción a la tabla
export class CreateFormDto {
    profile: Express.Multer.File; // --> Modulo para registrar una carga de imagen
    fullname: string;
    email: string;
    phone: number;
    birthday: Date;
}
