import cx from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

export enum EButtonVariant {
    DEFAULT = '@button-variant/DEFAULT',
    CANCEL = '@button-variant/CANCEL',
    ICON = '@button-variant/ICON',
    ICON_BLACK = '@button-variant/ICON_BLACK',
}

interface IButton {
    onClick?: () => void
    variant?: EButtonVariant,
    className?: string
}

export const Button = ({
    variant = EButtonVariant.DEFAULT,
    onClick = () => { /* empty callback */ },
    className = '',
    children
}: React.PropsWithChildren<IButton>) => {
    return (
        <button
            className={cx({
                [className]: !!className,
                [styles.btn]: true,
                [styles.btn_default]: variant === EButtonVariant.DEFAULT,
                [styles.btn_cancel]: variant === EButtonVariant.CANCEL,
                [styles.btn_icon]: variant === EButtonVariant.ICON,
                [styles.btn_icon_black]: variant === EButtonVariant.ICON_BLACK,
            })}
            onClick={onClick}>
                {children}
            </button>
    );
};
