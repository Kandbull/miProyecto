export interface Personaje{
    id: string | undefined;
    nombre: string | undefined;
    edad: number | undefined;
    genero: string | undefined;
    tPersonajeFunc: string | undefined;
    tPersonajeRol: string | undefined;
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

export interface RespuestaRandomPersonaje {
    randomPersonajes: RandomPersonaje[];
}

export interface RandomPersonaje {
    genderRandPer: string;
    nameRandPers: string;
}