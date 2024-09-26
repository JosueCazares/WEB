

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
    rolId: number;
}

export interface Estatus {
    ACTIVO
    INACTIVO
  }