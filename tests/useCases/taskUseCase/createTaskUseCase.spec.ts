import { CreateTaskUseCase } from '../../../src/useCases/tasksUseCase/createTask/createTaskUseCase'
import { taskMock, taskRepositoryMock, taskRepositoryMockWithError } from './mocks/taskMocks'

describe('example of createUserUseCase ', () => {
  const createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock)

  test('shoud be able create task', async () => {
    await createTaskUseCase.execute(taskMock, '1')
    expect(taskRepositoryMock.save).toBeCalled()
  })
  test('shoud not be able create task with error in saving data', async () => {
    const createtaskUseCaseWithError = new CreateTaskUseCase(taskRepositoryMockWithError)
    await expect(createtaskUseCaseWithError.execute(taskMock, '1')).rejects.toEqual(
      new Error('Error saving task data')
    )
  })
  test('shoud not be able create task without userId or Title', async () => {
    const createtaskUseCaseWithError = new CreateTaskUseCase(taskRepositoryMockWithError)
    await expect(createtaskUseCaseWithError
      .execute({ title: undefined, description: 'Task without title' }, 'userId'))
      .rejects.toEqual(
        new Error('Error in task structure')
      )
    await expect(createtaskUseCaseWithError
      .execute({ title: 'New task', description: 'Task without userId' }, undefined))
      .rejects.toEqual(
        new Error('Error in task structure')
      )
  })
})
