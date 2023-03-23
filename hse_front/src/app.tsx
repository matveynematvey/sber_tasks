import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary';
import { TasksPage } from './pages/tasks';
import { paths } from './pages/paths';
import { store } from './store';

export const App = () => {
    return (
        <StrictMode>
            <ErrorBoundary>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={paths.tasks} element={<TasksPage />}/>
                            <Route path={paths.index} element={<Navigate to={paths.tasks}/>}/>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ErrorBoundary>
        </StrictMode>
    );
};
