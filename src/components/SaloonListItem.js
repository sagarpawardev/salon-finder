import { React } from 'react'
import styles from './styles/SaloonListItem.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';

import RatingStar from './RatingStar';
import { GeoAltFill, Watch } from 'react-bootstrap-icons';

export function SaloonListItem(props) {

	return (
		<>
			<Container>
				<Row className={`${styles.salonListItem} py-2 my-2 bg-white`}>
					<Col xs="4" md="3">
						<Image style={{maxWidth: '110px'}} src={props.salon?.photo} rounded fluid />
					</Col>
					<Col xs="8" md="9" className='align-middle'>
						<h4 className={`${styles.salonListItemTitle} text-truncate`}>{props.salon?.name}</h4>
						<Row className={styles.smallText}>
							<Col xs='10' className={`text-muted`}>
								<span>{props.salon?.rating?.value}</span>
								<span className='mx-1'>
									<RatingStar value={props.salon?.rating?.value}></RatingStar>
								</span>
								<span>({props.salon?.rating?.count})</span>
							</Col>
						</Row>
						<Row className={`${styles.smallText} text-muted`}>
							<Col>
								<GeoAltFill size={12} className="align-baseline"/>
								<span className='mx-1'>{props.salon?.address}</span>
							</Col>
						</Row>
						<Row className={`${styles.smallText} text-muted`}>
							<Col>
								<Watch size={12} className="align-baseline"/>
								<span className='mx-1'>{props.salon?.workingTime}</span>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
}



export default SaloonListItem;