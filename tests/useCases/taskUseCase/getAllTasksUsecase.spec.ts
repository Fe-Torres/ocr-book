import { FindByIdTaskUseCase } from '../../../src/useCases/tasksUseCase/findByIdTask/findByIdTaskUseCase'
import { GetAllTasksByUserUseCase } from '../../../src/useCases/tasksUseCase/getAllTasksbyUser/getAllTasksUseCaseByUser'
import { taskQuery, taskRepositoryMock, taskRepositoryMockWithError } from './mocks/taskMocks'

describe('get all tasks by user example ', () => {
  const getAllTasksUseCase = new GetAllTasksByUserUseCase(taskRepositoryMock)

  test('shoud be able find task', async () => {
    const taskResult = await getAllTasksUseCase.execute(taskQuery)
    expect(taskResult).toEqual([
      {
        title: 'Pular fogueira',
        description: 'Dia 24 e dia 25!',
        userId: '1',
        isDone: false
      },
      {
        title: 'Comer bolo de aipim',
        description: 'Dia 24 e dia 25!',
        userId: '1',
        isDone: false
      },
      {
        title: 'Dançar quadrilha',
        description: 'Dia 24 e dia 25!',
        userId: '1',
        isDone: false
      }])
    expect(taskRepositoryMock.index).toBeCalled()
  })
  test('shoud be not able update task with task not found error', async () => {
    const findTaskByIdUseCaseWithError = new FindByIdTaskUseCase(taskRepositoryMockWithError)
    await expect(findTaskByIdUseCaseWithError.execute('123', 'userId')).rejects.toEqual(
      new Error('Task not found')
    )
  })
})
