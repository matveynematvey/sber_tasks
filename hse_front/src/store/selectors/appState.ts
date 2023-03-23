import { RootState } from '../index';

export const selectTasks = (state: RootState) => state.appState.tasks;
export const selectIsLoading = (state: RootState) => state.appState.isLoading;
export const selectTaskDetail = (state: RootState) => state.appState.taskDetail;
