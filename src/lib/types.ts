

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

export interface NewPass{
    token: string,
    nuevaPass: string
}

export interface Estatus {
    ACTIVO
    INACTIVO
  }
export interface Status {
    ACEPTADO
    RECHAZADO
  }

export interface Periodo{
    id: number;
    nombre: string;
    descripcion: string;
    status: StatusPeriodo;
    created_at: Date;
    updated_at: Date;
}  

export interface  StatusPeriodo { 
    ABIERTA
    INACTIVO
  }

export interface Grupo{
    id: number,
    nombre: string,
    periodo:string,
    carreraId : number,
    profesorId: number,
    alumnos  : GrupoAlumno[],
    created_at :string,
    updated_at:string,
}

export interface GrupoAlumno{
        id: number,
        grupoId   :number,
        alumnoId  :number,
        created_at :string,
        updated_at :string,
}

export interface Carrera {
    id  : number,
    nombre :string ,
    grupos :Grupo[] ,
    created_at :string,
    updated_at :string,
  }

export interface Beca {
    id: number,
    nombre: string,
    descripcion: string,
    status: StatusBeca,
    created_at: String,
    updated_at: String,
}

export interface StatusBeca {
    Activa
    Inactiva
  }
  

export interface Area{
    id :number,
    nombre :string, 
    catalogo_personal :Catalogo_personal[]
}  

export interface Catalogo_personal {
    id :number,
    nombre :string,
    correo :string,
    telefono:string
    curp :string,
    numero_empleado  :string,
    tipo_contrato :Contrato,
    fecha_ingreso :string,
    grupo: GrupoPersonal,
    estatus: Estatus,
    create_at :string,
    update_at :string,
    areaId:number,
  }

  export interface Contrato {
    BASE
    POR_HONORARIOS
  }

  export interface GrupoPersonal {
    PROFESORES
    RECURSOS_HUMANOS
    SERVICIOS_ESCOLARES
    INFORMATICA
  }

  export interface Libro{
    id: number,
    titulo: string,
    autor: string,
    genero: string,
    estatus: Estatus,
    universidad: string,
    created_at: string,
    updated_at: string,
    url: string,
  }
  