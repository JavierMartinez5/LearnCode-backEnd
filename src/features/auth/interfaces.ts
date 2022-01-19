export interface FormatedUser {
    userId: string
    email: string
    userName: string
    access_token: string
}

export interface Payload {
    sub: string
    email: string
    userName: string
    role?: string 
    iat: number
    exp: number
}

export interface ReturnedJWT {
    userId: string
    email: string,
    userName: string,
    role?: string 
}