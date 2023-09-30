import { React } from 'react'
import { Col } from 'react-bootstrap';
import styles from './styles/SalonServiceListItem.module.scss';
import { SelectableImage } from './SelectableImage';

export function StylistListItem({service, selected, onSelectionChange}) {
	const handleClick = () => {
		onSelectionChange({
			service: service,
			selected: !selected,
		});
	};
	
	return (
		<>
			<Col className='text-center p-2' onClick={handleClick}>
				<SelectableImage src={service?.pic} selected={selected} />
				<div className={styles.selectableContent}>
					{service?.name}
				</div>
			</Col>
		</>
	);
}

export default StylistListItem;