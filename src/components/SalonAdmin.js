import React from 'react';
import useCollapse from 'react-collapsed';
import './App.css';
import SalonForm from './SalonForm';

function SalonAdmin() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
    <div>
        <div className="collapsible">
            <div className="header">
                'Edit Salon Details'
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>  
        </div>

        <div className="collapsible">
            <div className="header">
                'Add/Remove Service'
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>

        <div className="collapsible">
            <div className="header">
                'Add/Remove Locality'
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>

        <div className="collapsible">
            <div className="header">
                'Add/Remove Stylist'
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>

        <div className="collapsible">
            <div className="header">
                'Get Booking'
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
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
            <div className="header">
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
            <div className="header">
                Add/Remove Service
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>
    );
}

function LocalityCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header">
                'Add/Remove Locality'
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>
    );
}

function StylistCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header">
                Add/Remove Stylist
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <SalonForm/>
                </div>
            </div>
        </div>
    );
}

function BookingCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header">
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