import classNames from 'classnames';
import React from 'react';
import styles from './SmallLoading.module.scss';

const SmallLoading: React.FC = () => {
    return (
        <div className={classNames({ [styles.verticallyCentered]: true })}>
            <div className={styles.loader}>
                <img src='/iconLoader.png' alt="Logo" className={styles.mainImg}/>
            </div>
        </div>
    );
};

export default SmallLoading;