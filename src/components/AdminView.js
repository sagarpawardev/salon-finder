import React from 'react';
import { useCollapse } from 'react-collapsed';
import './styles/App.css';
import AddCity from './AddCity';
import AddLocality from './AddLocality';
import SalonForm from './SalonForm';

function AdminView() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
    <div>   
        
        <SalonCollapsible/>     

        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Add Admin
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {/* <AddAdmin/> */}
                </div>
            </div>  
        </div>

        <CityCollapsible/>

        <LocalityCollapsible/>

        <ServiceCollapsible/>
        
    </div>
    );
}

function ServiceCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Add Service
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {/* <AddAdmin/> */}
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
                Add Locality
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <AddLocality/>
                </div>
            </div>  
        </div>
    );
}

function SalonCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                Add Salon
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>  
        </div>
    );
}

function CityCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
            Add City
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                <AddCity/>
            </div>
        </div>  
    </div>
    );
}

export default AdminView;