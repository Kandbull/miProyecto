export interface Personaje{
    id: string | undefined;
    nombre: string | undefined;
    edad: number | undefined;
    descripcion: string | undefined; 
}

export interface ShowAlertSimple {
	header: string
	subHeader?: string
	message?: string
	buttons: Array<string>
}

export interface Usuario {
    id: string | undefined;
    nombre: string | undefined;
    username: string | undefined;
}