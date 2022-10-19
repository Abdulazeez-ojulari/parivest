import React, { Component } from "react";
// import styles from './navbar.module.css';
import Link from "next/link";

class Navbar extends Component{
    constructor(){
        super();
        this.state = {
            sidebar: false,
            account: {}
        }
    }

    componentDidMount(){
    }

    toggleSidebar = () => {
        let sidebar = this.state.sidebar;
        this.setState({
            sidebar: !sidebar,
        })
    }

    render(){
        const { account } = this.state
        return(
            <React.Fragment>
                <div id="mySidenav" className="sidenav">
                    <div className="sidenav_top">
                        <a href="/" className="social_link">
                        <img src="/images/Logo.png" alt="logo" className="sidenav_logo" />
                        </a>
                    </div>
                    <div className="sidenav_links">
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="bx:home-alt"></span>
                            <a href="/">Home</a>
                        </div>
                        <div className="sidenav_link active">
                            <span className="iconify sidenav_link_icon" data-icon="lucide:users"></span>
                            <a href="/">Users</a>
                        </div>
                    </div>
                    {/* <div className="side_bottom">
                        <p className="pb">Contact Us</p>
                        <a target="_blank" rel="noreferrer" href="mailto:support@bquinssolution.com" className="social_link">
                        <p className="pb google">support@bquinssolution.com</p>
                        </a>
                        <p className="pb whatsapp">0814 111 6273</p>
                        <div className="sidenav_social">
                        <a target="_blank" rel="noreferrer" href="https://wa.me/2348141116273" className="social_link">
                            <i className="fab fa-whatsapp side_icon whatsapp"></i>
                        </a>
                        </div>
                    </div> */}
                    </div>
                    <div className="header">
                    <div className="welcome_user">
                        <p className="user_welcome">User</p>
                    </div>
                    <div className="user">
                        {/* <button className="logout_btn">log out</button> */}
                    </div>
                    <div className="user">
                        {/* <p className="user_email">jlrabdulazeez@gmail.com</p> */}
                    </div>
                    </div>
                    <button id="openbutton" className="openbtn">☰</button>
            </React.Fragment>
        )
    }
}

export default Navbar;