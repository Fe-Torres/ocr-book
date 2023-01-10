import { AuthUserUseCase } from '../../../src/useCases/authUseCase/authUser/authUserUseCase'
import { IToken } from '../../../src/useCases/authUseCase/authUser/interface'
import { RefreshTokenUseCase } from '../../../src/useCases/authUseCase/refreshToken/refreshTokenUseCase'
import { invalidRefreshToken, loginData, userRepositoryMockWithUser, validRefreshToken } from './mocks/authMocks'

describe('refreshToken example ', () => {
  const authUserUseCase = new AuthUserUseCase(userRepositoryMockWithUser)
  const refreshTokenUseCase = new RefreshTokenUseCase()
  test('shoud be able to refreshToken user', async () => {
    const token: IToken = await authUserUseCase.execute(loginData.email, loginData.password)
    expect(refreshTokenUseCase.execute(token.refreshToken)).not.toBeNull()
  })

  test('shoud be not able to refreshToken user with invalid refreshToken', async () => {
    try {
      refreshTokenUseCase.execute(invalidRefreshToken)
    } catch (error) {
      expect(error.message).toEqual('invalid token')
    }
  })
  test('shoud be not able to refreshToken user with invalid signature refreshToken', async () => {
    try {
      refreshTokenUseCase.execute(validRefreshToken)
    } catch (error) {
      expect(error.message).toEqual('invalid signature')
    }
  })
})
