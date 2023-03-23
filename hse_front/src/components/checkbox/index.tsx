import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface ICheckBoxProps {
    isChecked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    isDisabled?: boolean
}

export const CheckBox = ({
    isChecked,
    onChange,
    isDisabled = false,
    children,
}: React.PropsWithChildren<ICheckBoxProps>) => {
    return (
        <div className={styles.wrapper}>
            <input
                checked={isChecked}
                onChange={onChange}
                className={styles.checkbox}
                type='checkbox'
                disabled={isDisabled}/>
            <label
                className={cx({
                    [styles.label]: true,
                    [styles.label_disabled]: isDisabled,
                })}>
                {children}
            </label>
        </div>
    );
};
