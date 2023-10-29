import { React } from 'react';
import styles from './styles/SalonHeader.module.scss';

import RatingStar from './RatingStar';
import { GeoAltFill, Watch } from 'react-bootstrap-icons';

export function SalonHeader({salon}) {
	return (
		<>
			<div className={`text-center my-2 ${styles.salonName}`}>
				{salon.name}
			</div>

			<div className={styles.flexContainer}>
				<div className={`text-muted my-1 ${styles.smallText}`}>
					<span>
						<Watch size={12} className="align-baseline"/>
					</span>
					<span className={`${styles.paddedText}`}>{salon?.start_time}</span> - <span className={`${styles.paddedText}`}>{(salon?.end_time)%12}</span>
				</div>

				{ salon?.rating?.value &&
					<div className={`text-muted my-1 ${styles.smallText}`}>
						<span>{salon?.rating?.value}</span>
						<span className='mx-1'>
							<RatingStar value={salon?.rating?.value}></RatingStar>
						</span>
						<span>({salon?.rating?.count})</span>
					</div>
				}

			</div>

			<div className={`text-muted my-1 ${styles.smallText}`}>
				<span>
					<GeoAltFill size={12} className="align-baseline"/>
				</span>
				<a className={`${styles.paddedText}`} href={salon?.address_link}>
					{salon?.address}
				</a>
			</div>
		</>
	);
}

export default SalonHeader;