import { useSelector } from 'react-redux';
import { selectTasks } from '../../../store/selectors/appState';
import styles from './styles.module.scss';
import { TaskListItem } from './taskListItem';

export const TaskList = () => {
    const tasks = useSelector(selectTasks);

    return (
        <main className={styles.wrapper}>
            {tasks.map((item) => {
                return (
                    <TaskListItem key={item.id} data={item}/>
                );
            })}
            {tasks.length === 0 && (
                <div className={styles.emptyList}>No tasks yet</div>
            )}
        </main>
    );
};
