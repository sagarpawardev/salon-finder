import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/TimeSlotList.module.scss';
import { useEffect, useState } from 'react';
import TimeSlot from './TimeSlot';
import { client } from '../utils';
import Moment from 'react-moment';

export function TimeSlotList({salonId, services, stylist, onSelection}) {

    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
		client.post('/nextSlot')
			.then(response => response.data)
			.then(data => {
                return [data]
            })
			.then(setTimeSlots)
			.catch(errors => console.error(errors));
	}, []);

    const handleSlotClicked = (slot) => {
        setSelectedSlot(slot);
        onSelection(slot);
    } 

    return (
        <>
            <div className={`${styles.flexContainer} mb-3`}>
                <div className={styles.title}>Time Slot</div>
            </div>
            {timeSlots.map( (timeSlot, index) => (
                <div key={index} className='mb-3'>
                    <div className={styles.header}>
                        <Moment format='d MMM (dddd)'>{timeSlot?.date}</Moment>
                    </div>
                    <Container>
                        <Row xs="2" lg="6">
                            {timeSlot?.slots?.map( (slot, idx) => (
                                <Col key={idx}>
                                    <TimeSlot 
                                        slot={slot}
                                        selected={selectedSlot?.id === slot?.id}
                                        onClick={ handleSlotClicked }
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            ))}
        </>
    );
}

export default TimeSlotList;