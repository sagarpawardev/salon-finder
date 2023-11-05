import React, { useEffect, useState } from 'react';
import { useCollapse } from 'react-collapsed';
import { StylistAvailability } from './StylistAvailability';
import { StylistBookingList } from './StylistBookingList';
import client from '../utils/Client';

export function  StylistView() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [ stylistId, setStylistId ] = useState(null)
    // const { stylistId } = useParams();

    useEffect(() => {
        // Fetch the initial status from the API
        // client.get(`stylist/${stylistId}`)
        client.get('/stylist')
          .then((response) => {
            setStylistId(response?.data?.stylist_id);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }, []);

    return (
        <div>   

            <div>
                <h3>StylistId : {stylistId}</h3>
            </div>
            
            {/* <AvailabilityCollapsible stylistId={stylistId}/>     

            <StylistBookingCollapsible stylistId={stylistId}/> */}

            <AvailabilityCollapsible/>     

            <StylistBookingCollapsible/>
            
        </div>
    );
}

function AvailabilityCollapsible({stylistId}) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Availability
            </div>
            <div {...getCollapseProps()}>
                <StylistAvailability></StylistAvailability>
                {/* <StylistAvailability stylistId={stylistId}></StylistAvailability> */}
                {/* <div className="content">
                    StylistAvailability
                </div> */}
            </div>  
        </div>
    );
}

function StylistBookingCollapsible({stylistId}) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Booking List
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <StylistBookingList></StylistBookingList>
                    {/* <StylistBookingList stylistId={stylistId}></StylistBookingList> */}
                </div>
            </div>  
        </div>
    );
}

export default StylistView;