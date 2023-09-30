import { React } from 'react';
import styles from './styles/SalonDetails.module.scss';

import RatingStar from './RatingStar';
import { GeoAltFill, Watch } from 'react-bootstrap-icons';

export function SalonHeader({salon}) {
	return (
		<>
			<div className={`justify-content-md-center my-2 ${styles.salonName}`}>
				{salon.name}
			</div>
			
			<div className={`text-muted my-1 ${styles.smallText}`}>
				<span>{salon?.rating?.value}</span>
				<span className='mx-1'>
					<RatingStar value={salon?.rating?.value}></RatingStar>
				</span>
				<span>({salon?.rating?.count})</span>
			</div>
			
			<div className={`text-muted my-1 ${styles.smallText}`}>
				<span>
					<GeoAltFill size={12} className="align-baseline"/>
				</span>
				<span className={`${styles.paddedText}`}>
					{salon?.location}
				</span>
			</div>

			<div className={`text-muted my-1 ${styles.smallText}`}>
				<span>
					<Watch size={12} className="align-baseline"/>
				</span>
				<span className={`${styles.paddedText}`}>
					{salon?.workingTime}
				</span>
			</div>
		</>
	);
}

export default SalonHeader;