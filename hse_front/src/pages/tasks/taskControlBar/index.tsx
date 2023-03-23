import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/button';
import { AppDispatch } from '../../../store';
import { setTaskDetail } from '../../../store/slices/appState';
import styles from './styles.module.scss';

export const TaskControlBar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleNewTask = useCallback(() => {
        dispatch(setTaskDetail({
            id: '',
            name: '',
            description: '',
            isDone: false
        }));
    }, [dispatch]);

    return (
        <footer className={styles.wrapper}>
            <Button onClick={handleNewTask}>Новая задача</Button>
        </footer>
    );
};
