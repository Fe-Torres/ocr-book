/* eslint-disable no-undef */
import { IUsersRepository } from '../../../../src/repositories/interfaces/userRepository'
import { IUserRequestDTO } from '../../../../src/useCases/usersUseCase/createUser/createUserDTO'

export const userMock: IUserRequestDTO = {
  name: 'Teste Oliveira',
  email: 'teste@gmail.com',
  password: 'peter2022'
}
export const userMockInvalidEmail: IUserRequestDTO = {
  name: 'Teste Oliveira',
  email: 'testegmail.com',
  password: 'peter2022'
}
export const userMockInvalidPassword: IUserRequestDTO = {
  name: 'Teste Oliveira',
  email: 'teste@gmail.com',
  password: 'pet'
}
export const userRepositoryMock: IUsersRepository = {
  findByEmail: jest.fn(),
  save: jest.fn()
}
export const userRepositoryMockWithUserAlredyExists: IUsersRepository = {
  findByEmail: jest.fn().mockReturnValue(userMock),
  save: jest.fn()
}
export const userRepositoryMockWithErrorSaving: IUsersRepository = {
  findByEmail: jest.fn(),
  save: jest.fn().mockRejectedValue(new Error('Error saving user data'))
}
