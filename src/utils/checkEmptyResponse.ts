import { Response } from 'express'

export function checkEmptyResponse<T>(res: Response, data: T[] |null , errorMessage: string) {
  if (!data || data.length === 0) {
    return res.status(404).json({ errorMessage })
  }

  return res.status(200).json({ data })
}

export function checkEmptyObject<T>(res: Response, data: T | null | undefined, errorMessage: string) {
  if (!data) {
    return res.status(404).json({ errorMessage })
  }

  return res.status(200).json({ data })
}

