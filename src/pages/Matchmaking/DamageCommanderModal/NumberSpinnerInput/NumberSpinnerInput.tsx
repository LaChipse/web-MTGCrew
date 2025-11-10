import React from "react";
import styles from './NumberSpinnerInput.module.scss'

type NumberSpinnerProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
};

const NumberSpinnerInput: React.FC<NumberSpinnerProps> = ({
    value,
    onChange,
    min = 0,
    max = 21,
    step = 1,
}) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (!isNaN(num)) {
        onChange(Math.max(min, Math.min(max, num)));
        }
    };

    const increment = () => {
        onChange(Math.max(min, Math.min(max, value + 1)));
    }

    const decrement = () => {
        onChange(Math.max(min, Math.min(max, value - 1)))
    }

    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <button className={styles.incrementButton} onClick={increment}>+</button>
            <input
                value={value}
                onChange={handleInput}
                min={min}
                max={max}
                step={step}
                style={{width: value > 9 ? '20px' : '10px'}}
            />

            <button className={styles.incrementButton} onClick={decrement}>-</button>
        </div>
    );
};

export default NumberSpinnerInput;
