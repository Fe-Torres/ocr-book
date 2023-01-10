import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface ITokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function AuthMiddleware (request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({ message: 'token is missing', status_code: 401 })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { id } = data as ITokenPayload
    request.headers.userID = id
    return next()
  } catch (error) {
    return response.status(401).json({ message: error.message, status_code: 401 })
  }
}
