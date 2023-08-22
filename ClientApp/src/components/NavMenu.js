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
var locale = require('../common/locale.js');

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

    toggleNavbar= async () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    componentDidMount(){
        this.setCurrentTab();
    }

    setCurrentTab = async ()=>{
        const url = window.location.href;
        AppRoutes.forEach(i => {
            
            if(url.includes(i.path)){
                this.setState({tab: AppRoutes.indexOf(i)});
                return;
            }

        });

    }

    render() {
        return (
            <header {...this.props} className="sticky-top sticky-header" >
               
                <Tabs value={this.state.tab} onChange={(event, val) => this.setState({ tab: val })} className="navbar-expand-sm border-bottom box-shadow mb-2" centered  >
                    <Tab component={Link} to={AppRoutes[0].path} icon={<HomeSharpIcon />} iconPosition='top' label={locale.mainPageHeaderLocale}/>
                    <Tab component={Link} to={AppRoutes[1].path} icon={<BugReportSharpIcon />} iconPosition='top' label="Фичи" />
                    <Tab component={Link} to={AppRoutes[2].path} icon={<PersonPinIcon />} iconPosition='top' label={locale.participantPageHeaderLocale}/>
                    <Tab component={Link} to={AppRoutes[3].path} icon={<Diversity3SharpIcon />} iconPosition='top' label={locale.teamsPageHeaderLocale} />
                    <Tab component={Link} to={AppRoutes[4].path} icon={<EmojiEventsSharpIcon />} iconPosition='top' label={locale.tournamentPageHeaderLocale} />
                </Tabs>

            </header>
        );
    }
}
