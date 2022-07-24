import '@babel/polyfill'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { _clearError } from '../../actions'

const Alert = () => {

    const dispatch = useDispatch()
    const { success, error, message, code, pending, goto } = useSelector(state => state.request)
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        if (success || error) {
            setTimeout(() => {
                setFadeIn(true)
                var body = document.getElementsByTagName("body")
                if (body) {
                    body[0].classList = "modal-open"
                }
            }, 200);
        }
    }, [success, error])

    const onClose = () => {
        setTimeout(() => { dispatch(_clearError()) }, 200);
        setFadeIn(false)
        var body = document.getElementsByTagName("body")
        if (body) {
            body[0].classList = ""
        }
    }

    if (!success && !error) return null;

    return (<div className="modal-warn">
        <div className={`modal fade ${fadeIn ? 'in' : null}`} id="myAlertModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" style={{ display: 'block', paddingLeft: '0px' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        {goto || code == 'NotFound' ?
                            <button type="button" className="close" data-dismiss="modal" onClick={() => { window.location.href = goto }} aria-label="Close"><span aria-hidden="true">X</span></button>
                            : <button type="button" className="close" data-dismiss="modal" onClick={onClose} aria-label="Close"><span aria-hidden="true">X</span></button>}
                    </div>
                    <div className="modal-body">
                        {success && !message ? <span className="complete">
                            <img src="/images/correct.png" alt="" />
                            บันทึกข้อมูลเรียบร้อย</span>
                            : null}
                        {success && message ? <span className="complete">
                            <img src="/images/correct.png" alt="" />
                            หากคุณต้องการให้เกิดผลทางกฎหมาย  โปรดให้ข้อมูลครบถ้วนสมบูรณ์ <br />
                            ได้ทางอีเมล {message}</span>
                            : null}
                        {error ?
                            <span className="incomplete">
                                <img src="/images/failed.png" alt="" />
                                {message}</span>
                            : null}
                    </div>
                    {/* <div className="modal-footer">
                        {goto ? <button type="button" className="btn-agree" onClick={() => { window.location.href = goto }} data-dismiss="modal">ปิด</button>
                            : <button type="button" className="btn-agree" onClick={onClose} data-dismiss="modal">ปิด</button>}
                    </div> */}
                </div>
            </div>
        </div>
        <div className={`modal-backdrop fade ${fadeIn ? 'in' : null}`}></div>
    </div>)
}

export default Alert