import { UpdateTaskUseCase } from '../../../src/useCases/tasksUseCase/updateTask/updateTaskUseCase'
import { taskMock, taskRepositoryMock, taskRepositoryMockWithError } from './mocks/taskMocks'

describe('update task example ', () => {
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepositoryMock)

  test('shoud be able update task', async () => {
    await updateTaskUseCase.execute(taskMock, 'userId')
    expect(taskRepositoryMock.update).toBeCalled()
  })
  test('shoud be not able update task with task not found error', async () => {
    const updateTaskUseCaseWithError = new UpdateTaskUseCase(taskRepositoryMockWithError)
    await expect(updateTaskUseCaseWithError.execute(taskMock, 'userId')).rejects.toEqual(
      new Error('Task not found')
    )
  })
})
