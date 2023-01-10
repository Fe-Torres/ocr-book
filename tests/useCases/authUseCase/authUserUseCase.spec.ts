import { AuthUserUseCase } from '../../../src/useCases/authUseCase/authUser/authUserUseCase'
import { IToken } from '../../../src/useCases/authUseCase/authUser/interface'
import { userMockInvalidEmail } from '../userUseCase/mocks/userMocks'
import { loginData, userRepositoryMockWithoutUser, userRepositoryMockWithUser } from './mocks/authMocks'

describe('auth user example ', () => {
  const authUserUseCase = new AuthUserUseCase(userRepositoryMockWithUser)
  test('shoud be able to authenticate user', async () => {
    const token: IToken = await authUserUseCase.execute(loginData.email, loginData.password)
    expect(token).toHaveProperty('accessToken')
    expect(token).toHaveProperty('refreshToken')
  })
  test('shoud be not able to authenticate user with invalid email', async () => {
    await expect(authUserUseCase.execute(userMockInvalidEmail.email, loginData.password))
      .rejects.toEqual(
        new Error('Invalid e-mail.')
      )
  })
  test('shoud be not able to authenticate user with invalid password', async () => {
    await expect(authUserUseCase.execute(loginData.email, 's123'))
      .rejects.toEqual(
        new Error('Invalid password - Must contain 6 characters or more.')
      )
  })
  test('shoud be not able to authenticate user with incorret passowrd', async () => {
    await expect(authUserUseCase.execute(loginData.email, 'otherPassword'))
      .rejects.toEqual(
        new Error('Incorrect password.')
      )
  })
  test('shoud be not able to authenticate user with non-existent email ', async () => {
    const authUserUseCaseWithoutUser = new AuthUserUseCase(userRepositoryMockWithoutUser)
    await expect(authUserUseCaseWithoutUser.execute(loginData.email, loginData.password))
      .rejects
      .toEqual(
        new Error('User not found.')
      )
  })
})
