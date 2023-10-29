import React from 'react';
import { useCollapse } from 'react-collapsed';

function StylistView() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
    <div>   
        
        <AvailabilityCollapsible/>     

        <StylistBookingCollapsible/>
        
    </div>
    );
}

function AvailabilityCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Availability
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    StylistAvailability
                </div>
            </div>  
        </div>
    );
}

function StylistBookingCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Availability
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    StylistBookingList
                </div>
            </div>  
        </div>
    );
}

export default StylistView;