export interface ITaskRaw {
    id: number
    name: string
    description: string
    is_done: boolean
}

export interface ITask {
    id: string
    name: string
    description: string
    isDone: boolean
}

export const tasksModel = {
    fromApi: (dataRaw: ITaskRaw[]): ITask[] => {
        return dataRaw.map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            isDone: item.is_done,
        }));
    },
    fromApiDetail: (dataRaw: ITaskRaw): ITask => {
        return {
            id: String(dataRaw.id),
            name: dataRaw.name,
            description: dataRaw.description,
            isDone: dataRaw.is_done,
        };
    },
};
