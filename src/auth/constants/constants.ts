import { SetMetadata } from "@nestjs/common"


export const jwtConstants = {
    secret: "secretKey",

}

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = (): ReturnType<typeof SetMetadata> => SetMetadata(IS_PUBLIC_KEY, true)