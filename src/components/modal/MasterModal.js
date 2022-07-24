import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { _masterModalClose } from '../../actions';

function MasterModal({ className, title, handleClose, children }) {

    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true)
            var body = document.getElementsByTagName("body")
            if (body) {
                body[0].classList = "modal-open"
            }
        }, 200);
    }, [])

    const onClose = () => {
        setTimeout(() => { handleClose() }, 200);
        setFadeIn(false)
        var body = document.getElementsByTagName("body")
        if (body) {
            body[0].classList = ""
        }
    }

    return (<div className={`${className}`}>
        <div className={`modal fade ${fadeIn ? 'in' : null}`} id="exampleModal3" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={onClose} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 className="modal-title" id="myModalLabel">
                            {title}</h4>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade in" />
    </div>)
}

const mapStateToProps = (state) => {
    return { modal: state.masterModal }
}

const mapDispatchToProps = dispatch => {
    return {
        handleClose: () => dispatch(_masterModalClose()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterModal)