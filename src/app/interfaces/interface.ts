export interface Personaje{
    id: number | undefined;
    nombre: string | undefined;
    edad: number | undefined;
    //habilidad: string | undefined;
    descripcion: string | undefined; 
}

export interface ShowAlertSimple {
	header: string
	subHeader?: string
	message?: string
	buttons: Array<string>
}
