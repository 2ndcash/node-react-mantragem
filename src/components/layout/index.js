import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import Header from './Header'
import Footer from './Footer'
import Alert from '../common/Alert'
import HistoryModal from '../modal/HistoryModal'

const MainMenu = ({ menu }) => {
    return (<li className="nav-item">
        <a className="nav-link" href={menu.link}>
            {menu.icon ? <i className={menu.icon} /> : null}
            <span className="menu-title">{menu.text}</span>
        </a>
    </li>)
}

const SubMenu = ({ menu }) => {
    return (<li className="nav-item">
        <a className="nav-link" data-toggle="collapse" href={`#${menu.controls}`} aria-expanded="false" aria-controls={`${menu.controls}`}>
            {menu.icon ? <i className={menu.icon} /> : null}
            <span className="menu-title">{menu.text}</span>
            <i className="menu-arrow" />
        </a>
        <div className="collapse" id={`${menu.controls}`}>
            <ul className="nav flex-column sub-menu">
                {
                    menu.menus.map((m, index) => {
                        return (<li key={index} className="nav-item"> <a className="nav-link" href={m.link}> {m.text}</a></li>)
                    })
                }
            </ul>
        </div>
    </li>)
}

const Layout = props => {
    return (<>
        <Header />
        <div className="container-fluid page-body-wrapper">
            {/* partial */}
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                {
                    props.menus.length > 0 ?
                        <ul className="nav">
                            {
                                props.menus.map((menu, index) => {
                                    return (menu.link != "#" ? <MainMenu key={index} menu={menu} />
                                        : <SubMenu key={index} menu={menu} />)
                                })
                            }
                        </ul>
                        : null
                }
            </nav>
            {/* partial */}
            <div className="main-panel">
                {props.children}
                <Footer />
            </div>
        </div>
        <Alert />
    </>)
}

const mapStateToProps = (state) => {
    return { menus: state.menus || [] }
}

export const MainLayout = connect(mapStateToProps, null)(Layout)

export const ClientMainLayout = props => {
    return (<>
        <article>
            {props.children}
        </article>
        {/* <HistoryModal /> */}
    </>)
}