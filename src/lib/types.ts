

export type APIResponse<T> = {
    status: 'success' | 'error',
    data?: T,
    jwt?: string,
    error?: unknown
}

export interface LoginResponseData {
    rol: string;
    id: string;
    nombre: string;
}
export interface Rol {
    id: number;
    nombre: string;
    descripcion: string | null;
}

export interface Usuario  {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    nombre: string;
    correo: string;
    contrasena: string;
    estatus: Estatus;
    fechaCreacion: Date;
    rol: string;
}

export interface Aspirante{
    nombre      : string,
    email       : string,
    telefono    :string,
    curp       :string,
    username   : string,
    carrera_deseada : string,
    status    : Status
}

export interface Estatus {
    ACTIVO
    INACTIVO
  }
export interface Status {
    ACEPTADO
    RECHAZADO
  }