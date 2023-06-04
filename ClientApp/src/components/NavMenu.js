import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            value: undefined,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>

                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">Tournament</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

                    <Tabs value={this.state.value} onChange={(event, val) => this.setState({ value: val })}>
                        <Tab component={Link} to="/Test" icon={<BugReportSharpIcon />} iconPosition='start' label="Фичи"/>
                        <Tab component={Link} to="/Participants"  icon={<PersonPinIcon />} iconPosition='start' label="Участники" />
                    </Tabs>

                </Navbar>
            </header>
        );
    }
}
