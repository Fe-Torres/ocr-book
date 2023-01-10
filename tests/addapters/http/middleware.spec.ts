import { AuthUserUseCase } from '../../../src/useCases/authUseCase/authUser/authUserUseCase'
import { invalidRefreshToken, loginData, userRepositoryMockWithUser } from '../../useCases/authUseCase/mocks/authMocks'
import { IToken } from '../../../src/useCases/authUseCase/authUser/interface'
import { AppMock } from './mock/api/appMock'
import request from 'supertest'

describe('auth user example ', () => {
  const authUserUseCase = new AuthUserUseCase(userRepositoryMockWithUser)
  const appMock = new AppMock().server
  test('shoud be able to pass in middleware', async () => {
    const token: IToken = await authUserUseCase.execute(loginData.email, loginData.password)
    const validAccesToken = `Bearer ${token.accessToken}`
    expect(token).toHaveProperty('accessToken')
    expect(token).toHaveProperty('refreshToken')

    const response = await request(appMock).get('/test-middleware').set('Authorization', validAccesToken)
    expect(response.status).toBe(200)
  })
  test('shoud be not able to pass in middleware with invalid acces token', async () => {
    const invalidAccesToken = `Bearer ${invalidRefreshToken}`
    const response = await request(appMock).get('/test-middleware').set('Authorization', invalidAccesToken)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('invalid token')
  })
  test('shoud be not able to pass in middleware without token', async () => {
    const response = await request(appMock).get('/test-middleware')
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('token is missing')
  })
})
