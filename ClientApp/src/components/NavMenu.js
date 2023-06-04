import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            tab: 0,
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

                <Navbar className="navbar-expand-sm border-bottom box-shadow mb-2" container light>
                    <NavbarBrand tag={Link} to="/">Tournament</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

                    <Tabs value={this.state.tab} onChange={(event, val) => this.setState({ tab: val })}>
                        <Tab component={Link} to="/Test" icon={<BugReportSharpIcon />} iconPosition='top' label="Фичи"/>
                        <Tab component={Link} to="/Participants" icon={<PersonPinIcon />} iconPosition='top' label="Участники" />
                        <Tab component={Link} icon={<Diversity3SharpIcon />} iconPosition='top' label="Команды" />
                        <Tab component={Link} icon={<EmojiEventsSharpIcon />} iconPosition='top' label="Турниры" />
                    </Tabs>

                </Navbar>
            </header>
        );
    }
}
