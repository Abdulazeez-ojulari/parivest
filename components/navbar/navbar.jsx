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
                        <Link href="/">
                        <a className="social_link">
                        <img src="/images/Logo.png" alt="logo" className="sidenav_logo" />
                        </a>
                        </Link>
                    </div>
                    <div className="sidenav_links">
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="bx:home-alt"></span>
                            <Link href="/">
                                <a >Home</a>
                            </Link>
                        </div>
                        <div className="sidenav_link active">
                            <span className="iconify sidenav_link_icon" data-icon="lucide:users"></span>
                            <Link href="/">
                                <a >Users</a>
                            </Link>
                            
                        </div>
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="ant-design:line-chart-outlined"></span>
                            <Link href="/">
                                <a >Investment</a>
                            </Link>
                        </div>
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="la:piggy-bank"></span>
                            <Link href="/">
                                <a >Savings</a>
                            </Link>
                        </div>
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="simple-line-icons:wallet" data-rotate="180deg" data-flip="vertical"></span>
                            <Link href="/">
                                <a >Wallet</a>
                            </Link>
                        </div>
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="bx:user"></span>
                            <Link href="/">
                                <a >Admins</a>
                            </Link>
                        </div>
                    </div>
                    <div className="side_bottom">
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="fluent:key-20-regular"></span>
                            <Link href="/">
                                <a >Change password</a>
                            </Link>
                        </div>
                        <div className="sidenav_link">
                            <span className="iconify sidenav_link_icon" data-icon="heroicons-outline:logout"></span>
                            <Link href="/">
                                <a >Logout</a>
                            </Link>
                        </div>
                    </div>
                    </div>
                    <div className="header">
                    <div className="welcome_user">
                        <p className="user_welcome">User</p>
                    </div>
                    <div className="user">
                        <span className="iconify user_icon" data-icon="uiw:reload"></span>
                        <span className="iconify user_icon" data-icon="codicon:bell-dot"></span>
                        <div className="user_name">
                            <h3>Ole gunnar</h3>
                            <p>Super admin</p>
                        </div>
                        <img src="/images/Ellipse.png" alt="profile image" />
                    </div>
                    </div>
                    <button id="openbutton" className="openbtn">☰</button>
            </React.Fragment>
        )
    }
}

export default Navbar;