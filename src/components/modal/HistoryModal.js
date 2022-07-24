import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

import { withFormik, Form, Field, FieldArray, getIn, } from 'formik';
import * as Yup from 'yup';

import { _masterModalData, _masterModalClose } from '../../actions'

function HistoryModal(props) {
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        if (!fadeIn) {
            setTimeout(() => {
                setFadeIn(true)
                var body = document.getElementsByTagName("body")
                if (body) {
                    body[0].classList = "modal-open"
                }
            }, 200);
        }
    }, [])

    const onClose = () => {
        setTimeout(() => { props.handleClose() }, 200);
        setFadeIn(false)
        var body = document.getElementsByTagName("body")
        if (body) {
            body[0].classList = ""
        }
    }

    const onClickHandler = (data) => {
        props.handleSelect(data)
        onClose()
    }

    return (<div className="modal-view-detail">
        <div className={`modal fade ${fadeIn ? 'in' : null}`} id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" style={{ display: 'block', paddingLeft: '0px' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">X</span></button>
                        <h4 className="modal-title" id="myModalLabel">ส่งอีมล</h4>
                    </div>
                    <div className="modal-body">
                        {/* <button className="btn-go-help" onClick={() => onClickHandler("1")}>บอกความต้องการ</button>
                        <button className="btn-go-registor" onClick={() => onClickHandler("2")}>สมัครสร้างอนาคตไทย</button> */}
                    </div>
                </div>
            </div>
        </div>
        <div className={`modal-backdrop fade ${fadeIn ? 'in' : null}`}></div>
    </div>)
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelect: (data) => dispatch(_masterModalData(data)),
        handleClose: () => dispatch(_masterModalClose())
    }
}

export default connect(null, mapDispatchToProps)(HistoryModal)