import { FindByIdTaskUseCase } from '../../../src/useCases/tasksUseCase/findByIdTask/findByIdTaskUseCase'
import { taskRepositoryMock, taskRepositoryMockWithError } from './mocks/taskMocks'

describe('find task by id example ', () => {
  const findByIdTaskUseCase = new FindByIdTaskUseCase(taskRepositoryMock)

  test('shoud be able find task', async () => {
    const taskResult = await findByIdTaskUseCase.execute('taskId', '1')
    expect(taskResult).toEqual({
      title: 'Pular fogueira',
      description: 'Dia 24 e dia 25!',
      userId: '1'
    })
    expect(taskRepositoryMock.findById).toBeCalled()
  })
  test('shoud be not able update task with task not found error', async () => {
    const findTaskByIdUseCaseWithError = new FindByIdTaskUseCase(taskRepositoryMockWithError)
    await expect(findTaskByIdUseCaseWithError.execute('123', 'userId')).rejects.toEqual(
      new Error('Task not found')
    )
  })
})
