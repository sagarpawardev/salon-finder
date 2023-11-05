import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/TimeSlotList.module.scss';
import { useEffect, useState } from 'react';
import TimeSlot from './TimeSlot';
import { client } from '../utils';

export function TimeSlotList({salonId, services, stylist, onSelection}) {

    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedAfterMin, setSelectedAfterMin] = useState(null);

    useEffect(() => {
		client.get('/slotsToDisplay')
			.then(response => response.data)
			.then(data => {
                return [data]
            })
			.then(setTimeSlots)
			.catch(errors => console.error(errors));
	}, [salonId, services, stylist]);

    const handleSlotClicked = (slot) => {
        setSelectedAfterMin(undefined);
        setSelectedSlot(slot);
        onSelection(slot, 'slot');
    }
    
    const handleAfterMinClicked = (slot) => {
        setSelectedSlot(undefined);
        setSelectedAfterMin(slot);
        onSelection(slot, 'afterMin');
    }

    return (
        <>
            <div className={`${styles.flexContainer} mb-3`}>
                <div className={styles.title}>Time Slot</div>
            </div>
            <div>
                {timeSlots.map( (timeSlot, index) => (
                    <div key={index} className='mb-3'>
                        {/* <div className={styles.header}>
                            <Moment format='d MMM (dddd)'>{timeSlot?.date}</Moment>
                        </div> */}
                        <Container>
                            <Row xs="2" sm="3" md="4" lg="5">
                                {timeSlot?.default_slots?.map( (slot, idx) => (
                                    <Col key={idx}>
                                        <TimeSlot 
                                            slot={slot}
                                            selected={selectedAfterMin?.value === slot?.value}
                                            onClick={ handleAfterMinClicked }
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                ))}
            </div>
            <div>
                {timeSlots.map( (timeSlot, index) => (
                    <div key={index} className='mb-3'>
                        {/* <div className={styles.header}>
                            <Moment format='d MMM (dddd)'>{timeSlot?.date}</Moment>
                        </div> */}
                        <Container>
                            <Row xs="2" sm="3" md="4" lg="5">
                                {timeSlot?.current_slots?.map( (slot, idx) => (
                                    <Col key={idx}>
                                        <TimeSlot 
                                            slot={slot}
                                            selected={selectedSlot?.value === slot?.value}
                                            onClick={ handleSlotClicked }
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TimeSlotList;