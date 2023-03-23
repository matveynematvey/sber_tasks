import { getApiInstance } from './apiInstance';
import { AxiosResponse } from 'axios';
import { ITask, ITaskRaw, tasksModel } from '../models/tasks';
import statuses from 'http-status-codes';

enum ETasksEndpoints {
    TASKS = '/tasks/',
    TASK = '/tasks/:id/',
}

export const tasksService = {
    getTasks: async () => {
        const apiInstance = getApiInstance();
        const response: AxiosResponse<ITaskRaw[]> = await apiInstance.get(ETasksEndpoints.TASKS);
        if (response.status === statuses.OK) {
            return tasksModel.fromApi(response.data);
        }
        return null;
    },
    createTask: async (data: ITask) => {
        const apiInstance = getApiInstance();
        const response: AxiosResponse<ITaskRaw> = await apiInstance.post(ETasksEndpoints.TASKS, {
            name: data.name,
            description: data.description,
            is_done: data.isDone,
        });
        if (response.status === statuses.CREATED) {
            return tasksModel.fromApiDetail(response.data);
        }
        return null;
    },
    updateTask: async (data: ITask) => {
        const apiInstance = getApiInstance();
        const response: AxiosResponse<ITaskRaw> = await apiInstance.put(ETasksEndpoints.TASK.replace(':id', data.id), {
            name: data.name,
            description: data.description,
            is_done: data.isDone,
        });
        if (response.status === statuses.OK) {
            return tasksModel.fromApiDetail(response.data);
        }
        return null;
    },
    deleteTask: async (data: ITask) => {
        const apiInstance = getApiInstance();
        const response: AxiosResponse<null> = await apiInstance.delete(ETasksEndpoints.TASK.replace(':id', data.id));
        if (response.status === statuses.NO_CONTENT) {
            return true;
        }
        return false;
    }
};
