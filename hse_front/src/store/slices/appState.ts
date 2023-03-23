import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../models/tasks';

interface IState {
    isLoading: boolean
    tasks: ITask[]
    taskDetail: null | ITask
}

const initialState: IState = {
    isLoading: false,
    tasks: [],
    taskDetail: null,
};

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setTaskDetail: (state, action: PayloadAction<ITask | null>) => {
            state.taskDetail = action.payload;
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((item) => item.id !== action.payload);
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            state.tasks = state.tasks.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        },
        setTaskName: (state, action: PayloadAction<string>) => {
            if (!state.taskDetail) {
                return;
            }
            state.taskDetail.name = action.payload;
        },
        setTaskDesc: (state, action: PayloadAction<string>) => {
            if (!state.taskDetail) {
                return;
            }
            state.taskDetail.description = action.payload;
        },
        setTaskIsDone: (state, action: PayloadAction<boolean>) => {
            if (!state.taskDetail) {
                return;
            }
            state.taskDetail.isDone = action.payload;
        }
    },
});

export const {
    setTasks,
    setLoading,
    setTaskDetail,
    addTask,
    deleteTask,
    setTaskName,
    setTaskDesc,
    setTaskIsDone,
    updateTask,
} = appStateSlice.actions;

export default appStateSlice.reducer;


