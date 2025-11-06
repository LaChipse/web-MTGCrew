import { useEffect } from 'react'
import styles from './Match.module.scss'

type Props = {
    toggleDrawer: (isOpened: boolean) => void
    conf: Array<Record<string, string>>
}

const Match: React.FC<Props> = ({ conf, toggleDrawer }) => {
    useEffect(() => {
        const divs = document.querySelectorAll(`.${styles.imgContainer}`);

        divs.forEach(div => {
            const img = new Image();
            img.src = div.getAttribute('data-bg') || '';
            img.onload = () => {

                (div as HTMLElement).style.backgroundImage = `url(${img.src})`;
            };
        });
    }, [conf]);

    const gridCOnfig = () => {
        switch (conf.length) {
            case 1:
            case 2:
                return {display: "grid"}
            case 3:
                return {display: "grid", 'gridTemplateColumns': '1fr 1fr'}
            case 4:
                return {display: "grid", 'gridTemplateColumns': '1fr 1fr'}
            default:
                return {display: "grid"};
        }
    }

    return (
        <>
            <button className={styles.close} onClick={() => toggleDrawer(false)}>X</button>
            <div style={{ height: "100vh", width: "100%", ...gridCOnfig() }}>
            {conf.map((c, index) => (
                <div
                    className={styles.imgContainer}
                    style={{
                        gridColumn: conf.length === 3 && index === 2 ? "1 / -1" : 0,
                    }}
                    data-bg ={c.imageUrl}
                >  
                    <div>
                        <h2>{c.player}</h2>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
}

export default Match