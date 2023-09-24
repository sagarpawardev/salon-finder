import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './styles/RatingStart.module.scss'
import React from 'react';

class RatingStar extends React.Component {

    constructor(props) {
        super(props);

        let stars = this.roundNearestPt5(props.value); 
        const filledStars = Math.floor(stars);
        const halfStars = Math.round(stars - filledStars);
        const emptyStars = this.props.max - Math.ceil(stars);
        this.state = {
            filledStars,
            halfStars,
            emptyStars,
        };
    }

    roundNearestPt5(num) {
        return (Math.round(num * 2) / 2).toFixed(1);
    }

    getFilledStars() {
        let container = [];
        for(let i = 0; i<this.state.filledStars; i++){
            container.push( (
                <span className={style.faIcon} key={`filled${i}`}>
                    <FontAwesomeIcon icon={faStar} size={this.props.size} style={{color:this.props.color,}} />
                </span>
            ) );
        }
        return container;
    }

    getHalfStarts() {
        let container = [];
        for(let i = 0; i<this.state.halfStars; i++){
            container.push( (
                <span className={style.faIcon} key={`half${i}`}>
                    <FontAwesomeIcon icon={faStarHalf} size={this.props.size} style={{
                        color:this.props.color,
                    }} />
                </span>
            ));
        }

        return container;
    }

    getEmptyStars() {
        let container = [];
        for(let i = 0; i<this.state.emptyStars; i++){
            container.push( (
                <span className={style.faIcon} key={`empty${i}`}>
                    <FontAwesomeIcon icon={faStar} key={i} size={this.props.size} style={{color: this.props.secondaryColor,}} />
                </span>
            ) );
        }
        return container;
    }

    render() {
        return (
            <>
                { this.getFilledStars() }
                { this.getHalfStarts() }
                { this.getEmptyStars() }
            </>
        );
    }
}

RatingStar.defaultProps = {
    secondaryColor: '#FFFFFF',
    color: '#f2c545',
    size: 'xs',
    value: 3.5,
    max: 5,
}

export default RatingStar;