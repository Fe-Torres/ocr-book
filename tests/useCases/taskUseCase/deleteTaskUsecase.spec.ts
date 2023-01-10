import { DeleteTaskUseCase } from '../../../src/useCases/tasksUseCase/deleteTask/deleteTaskUseCase'
import { taskRepositoryMock, taskRepositoryMockWithError } from './mocks/taskMocks'

describe('delete task example ', () => {
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryMock)

  test('shoud be able create task', async () => {
    await deleteTaskUseCase.execute('taskId', 'userId')
    expect(taskRepositoryMock.delete).toBeCalled()
  })
  test('shoud be not able create task with task not found error', async () => {
    const deleteTaskUseCaseWithError = new DeleteTaskUseCase(taskRepositoryMockWithError)
    await expect(deleteTaskUseCaseWithError.execute('taskId', 'userId')).rejects.toEqual(
      new Error('Task not found')
    )
  })
})
