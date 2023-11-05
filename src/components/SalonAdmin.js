import React, { useState, useEffect } from 'react';
import { useCollapse } from 'react-collapsed';
import SalonForm from './SalonForm';
import { client } from '../utils';
import { useParams } from 'react-router-dom';
import SalonServiceUpdate from './SalonServiceUpdate';
import MapLocality from './MapLocality';
import SalonStylist from './SalonStylist';

export function SalonAdmin() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [ role, setRole ] = useState(null)
    const [ salonBooking, setSalonBooking ] = useState(null)
    const { salonId } = useParams();

    useEffect(() => {
        client.get("/role")
            .then(response => response.data)
            .then(data => {
                setRole(data.role)
            });

            client.get(`/salon/${salonId}/booking`)
            .then(response => response.data)
            .then(data => {
                setSalonBooking(data)
            });

    }, []);


    if (role != 'SALON_OWNER'){
        return <div>You are not owner of the salon</div>
    }
    else
        return (
            
            <div>
                <div>
                    <h3>SalonId : {salonId}</h3>
                </div>

                <SalonFormCollapsible></SalonFormCollapsible>
                
                <ServiceCollapsible></ServiceCollapsible>

                <LocalityCollapsible></LocalityCollapsible>

                <StylistCollapsible></StylistCollapsible>

                <div className="collapsible">
                    <div className="header" {...getToggleProps()}>
                        Get Bookings
                    </div>
                    <div {...getCollapseProps()}>
                        <div className="content">
                            <h5>Completed : {salonBooking?.completed}</h5>
                            <h5>upcoming : {salonBooking?.upcoming}</h5>
                        </div>
                    </div>
                </div>
            </div>
            );
}



function SalonFormCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Edit Salon Details
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>  
        </div>
    );
}

function ServiceCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Add/Remove Service
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonServiceUpdate />
                </div>
            </div>
        </div>
    );
}

function LocalityCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Add/Remove Locality
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <MapLocality />
                </div>
            </div>
        </div>
    );
}

function StylistCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Add/Remove Stylist
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonStylist/>
                </div>
            </div>
        </div>
    );
}

function BookingCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Get Booking
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>
    );
}

export default SalonAdmin;