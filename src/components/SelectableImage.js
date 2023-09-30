import { Image } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import styles from './styles/SelectableImage.module.scss';

export function SelectableImage({src, selected}) {
    return (
        <>
        <div className={`${styles.selectableContainer}`}>
            <div className={`${styles.overlayContainer}`}>
                <Image className={`${styles.profilePic}`} src={src} roundedCircle/>
                { selected && 
                    <div className={`${styles.overlay}`}>
                        <CheckCircleFill className={styles.overlayIcon}/>
                    </div>
                }
            </div>
        </div>
            {/* <div className={`${styles.overlayContainer}`}>
                <Image className={`${styles.profilePic}`} src={src} roundedCircle/>
                <div className={`${styles.overlay} align-middle}`}>
                    <CheckCircleFill className={styles.overlayIcon}/>
                </div>
            </div> */}
        </>
    );
}

export default SelectableImage;