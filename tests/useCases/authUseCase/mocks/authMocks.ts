/* eslint-disable no-undef */
import { IUsersRepository } from '../../../../src/repositories/interfaces/userRepository'
import { IUserRequestDTO } from '../../../../src/useCases/usersUseCase/createUser/createUserDTO'

const userMockWithEncryptPassword: IUserRequestDTO = {
  name: 'Teste Oliveira',
  email: 'teste@gmail.com',
  password: '$2b$10$BOBl3jkp7jTx8hBrCKXdxeMiRk7l.VqffcMs0mvjV4ZilZsknQUGy'
}
export const loginData = {
  email: 'email@teste.com',
  password: '123456'
}
export const userRepositoryMockWithUser: IUsersRepository = {
  findByEmail: jest.fn().mockReturnValue(userMockWithEncryptPassword),
  save: jest.fn()
}
export const userRepositoryMockWithoutUser: IUsersRepository = {
  findByEmail: jest.fn(),
  save: jest.fn()
}

export const invalidRefreshToken = 'eyJhbGciOiJkpXVCJ9.eyJpZCI6IjE4N2U2M2NjLWFkYTktNDVjMi1hNjRjLTQwYTg5MjU2NTQ2YyIsImlhdCI6MTY1NTkyMDAzMSwiZXhwIjoxNjU1OTIzNjMxfQ.0QyiysHeulIJF7D48-wME7c'
export const validRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4N2U2M2NjLWFkYTktNDVjMi1hNjRjLTQwYTg5MjU2NTQ2YyIsImlhdCI6MTY1NTkyMDAzMSwiZXhwIjoxNjU1OTIzNjMxfQ.0QyiysHeulIJF7D4OZoqT_UhY0eYBw6Ll5-u8-wME7c'
