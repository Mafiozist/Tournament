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
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AppRoutes from '../AppRoutes.js';

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

    componentDidMount(){
        this.setCurrentTab();
    }

    setCurrentTab(){
        const url = window.location.href;
        AppRoutes.forEach(i => {
            
            if(url.includes(i.path)){
                this.setState({tab: AppRoutes.indexOf(i)});
            }

        });

    }

    render() {
        return (
            <header {...this.props}>
               
                <Tabs value={this.state.tab} onChange={(event, val) => this.setState({ tab: val })} className="navbar-expand-sm border-bottom box-shadow mb-2" centered >
                    <Tab component={Link} to={AppRoutes[0].path} icon={<HomeSharpIcon />} iconPosition='top' label="Главная" />
                    <Tab component={Link} to={AppRoutes[1].path} icon={<BugReportSharpIcon />} iconPosition='top' label="Фичи" />
                    <Tab component={Link} to={AppRoutes[2].path} icon={<PersonPinIcon />} iconPosition='top' label="Участники" />
                    <Tab component={Link} to={AppRoutes[3].path} icon={<Diversity3SharpIcon />} iconPosition='top' label="Команды" />
                    <Tab component={Link} to={AppRoutes[4].path} icon={<EmojiEventsSharpIcon />} iconPosition='top' label="Турниры" />
                </Tabs>

            </header>
        );
    }
}
