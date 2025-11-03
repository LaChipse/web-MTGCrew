import React from 'react';
import styles from './SmallLoading.module.scss';

type Props = {
    heightContainer?: string,
    dimensionLoader?: string
    borderWidth?: string
} & React.HTMLProps<HTMLImageElement>

const SmallLoading: React.FC<Props> = ({heightContainer= '70vh', dimensionLoader= '30px', borderWidth='5px'}) => (
    <div style={{height: heightContainer}} className={styles.verticallyCentered}>
        <div 
            style={{
                width: dimensionLoader, 
                height: dimensionLoader, 
                border: `${borderWidth} solid transparent`, 
                borderTopColor: '#F3F56C99', 
                borderLeftColor: '#F3F56C99',
                borderBottomColor: '#F3F56C99' 
            }} 
            className={styles.spinner}
        />
    </div>
);

export default SmallLoading;