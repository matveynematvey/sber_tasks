import logoImg from '../../images/logo.png';
import styles from './styles.module.scss';

export const Header = () => {
    return (
        <header className={styles.wrapper}>
            <img className={styles.logo} src={logoImg} />
            <p className={styles.title}>To-Do лист</p>
        </header>
    );
};
