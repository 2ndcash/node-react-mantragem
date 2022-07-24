import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ menus }) => {
    return (<header>
        <div className="wrapper-header">
            <div className="layout-header">
                <div id="mySidebar" className="sidebar">
                    <a className="closebtn">☰</a>
                    {
                        menus.map((menu, i) => {
                            return <a key={i} href={menu.link}>{menu.text}</a>
                        })
                    }
                    {/* <a href="/user/profile">โปรไฟล์ส่วนตัว</a>
                    <a href="/user/profile">แก้ไขรหัสผ่าน</a>
                    <a href="/user/profile">หน้าธุรกิจ</a>
                    <a href="#">หน้าขาย</a>
                    <a href="/user/profile">ช่องทางการชำระเงิน</a>
                    <a href="/user/profile">ช่องทางโซเซียล</a>
                    <a href="/user/profile">ความสนใจ</a>
                    <a href="/user/profile">ยืนยันตัวตน <strong>*</strong></a> */}
                </div>
                <div id="main">
                    <button className="openbtn">☰ </button>
                </div>
                <div className="box-logo">
                    <a>
                        <img src="/images/2Cash_green.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
    </header>
    )
}

const mapStateToProps = (state) => {
    return { menus: state.menus || [] }
}

export default connect(mapStateToProps, null)(Header)