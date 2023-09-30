import { React } from 'react'
import { Col } from 'react-bootstrap';
import { SelectableImage } from './SelectableImage';

export function StylistListItem({stylist, selected, onSelect}) {
	const handleClick = () => {
		onSelect(stylist);
	};
	
	return (
		<>
			<Col className='text-center p-2' onClick={handleClick}>
				<SelectableImage src={stylist?.photo} selected={selected}/>
				<div>{stylist.name}</div>
			</Col>
		</>
	);
}

export default StylistListItem;