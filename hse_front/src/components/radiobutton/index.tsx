import styles from './styles.module.scss';

interface IOptionProps {
    id: string
    checked: boolean
    onChange: (id: string) => void
}

export const RadioButton = ({
    id,
    checked,
    onChange,
    children,
}: React.PropsWithChildren<IOptionProps>) => {
    return (
        <div className={styles.wrapper}>
            <input type='radio' checked={checked} onChange={() => { onChange(id); }}/>
            <label className={styles.label}>
                {children}
            </label>
        </div>
    );
};
