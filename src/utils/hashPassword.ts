import { genSalt, hash } from 'bcrypt-ts'

export const HashPassword = async (password: string) => {
  const salt = await genSalt(10)
  const resultHash = await hash(password, salt)
  return resultHash
}
