import classNames from 'classnames';
import React from 'react';
import styles from './SmallLoading.module.scss';

type Props = React.HTMLProps<HTMLImageElement>

const SmallLoading: React.FC<Props> = ({...props}) => (
    <div className={classNames({ [styles.verticallyCentered]: true })}>
        <div className={styles.loader}>
            <img {...props} src='/iconLoader.svg' alt="Logo" className={styles.mainImg}/>
        </div>
    </div>
);

export default SmallLoading;