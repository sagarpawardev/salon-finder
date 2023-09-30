import styles from './styles/TimeSlot.module.scss';

export function TimeSlot({slot, selected, onClick}) {
    const handleClick = () => {
        onClick(slot);
    }
    return (
        <>
            <div 
                onClick={handleClick}
                className={
                    `px-3 py-2 my-2 c-clickable
                        ${styles.roundBorder} 
                        ${styles.smallCenterText} 
                        ${selected ? styles.selected : ''}
                    `}
            >
                {slot.startTime} - {slot.endTime}
            </div>
        </>
    );
}

export default TimeSlot;