/* eslint no-undef: 0 */

import { CreateUserUseCase } from '../../../src/useCases/usersUseCase/createUser/createUserUseCase'
import { userMock, userMockInvalidEmail, userMockInvalidPassword, userRepositoryMock, userRepositoryMockWithErrorSaving, userRepositoryMockWithUserAlredyExists } from './mocks/userMocks'

describe('example of createUserUseCase ', () => {
  const createUserUseCase = new CreateUserUseCase(userRepositoryMock)

  test('shoud be able create user', async () => {
    await createUserUseCase.execute(userMock)
    expect(userRepositoryMock.save).toBeCalled()
  })
  test('shoud not be able create user', async () => {
    const createUserUseCaseWithError = new CreateUserUseCase(userRepositoryMockWithErrorSaving)
    await expect(createUserUseCaseWithError.execute(userMock)).rejects.toEqual(
      new Error('Error saving user data')
    )
  })
  test('shoud not be able create user with invalid e-mail', async () => {
    await expect(createUserUseCase.execute(userMockInvalidEmail)).rejects.toEqual(
      new Error(`Invalid e-mail: '${userMockInvalidEmail.email}'`)
    )
  })
  test('shoud not be able create user with invalid password', async () => {
    await expect(createUserUseCase.execute(userMockInvalidPassword)).rejects.toEqual(
      new Error('Invalid password - Must contain 6 characters or more')
    )
  })
  test('shoud not be able create user with duplicated e-mail', async () => {
    const createUserUseCaseWithReturnUser = new CreateUserUseCase(userRepositoryMockWithUserAlredyExists)
    await expect(createUserUseCaseWithReturnUser.execute(userMock)).rejects.toEqual(
      new Error('User already exists.')
    )
  })
})
