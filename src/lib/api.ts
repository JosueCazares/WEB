/* 
T representa un Tipo generico, es decir, permite al desarrollador definir el type de retorno de una funcion para castear de manera automatica.
Este type debe coincidir con el type que ustedes definan para las respuestas de la API y la respuesta siempre debe tener una misma estructura para funcionar correctamente.
*/
export async function httpAPI<T>(endpoint: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT', body?: any, headers: HeadersInit = {}): Promise<T> {
    const opciones: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: method === 'POST' || 'DELETE' || 'PUT' ? JSON.stringify(body) : undefined,
    }
    return fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        }).catch((error) => {
            console.log(error);
            throw new Error(error)
        })
}