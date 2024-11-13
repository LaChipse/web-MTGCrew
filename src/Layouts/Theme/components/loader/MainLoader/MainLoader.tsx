import classNames from 'classnames';
import React from 'react';
import styles from './MainLoader.module.scss';

type Props = {
  isVerticallyCentered?: boolean
}

const MainLoader: React.FC<Props> = ({ isVerticallyCentered }) => {
  return (
    <div className={classNames({ [styles.verticallyCentered]: isVerticallyCentered })}>
      <div className={styles.loader}>
        <img src='/fist_loader.png' alt="Logo" />
        <div className={styles.loader1}>
          <div className={styles.loader2}>
            <div className={styles.loader3}>
              <div className={styles.loader4}>
                <div className={styles.loader5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;
