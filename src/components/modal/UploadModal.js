import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { uploadModalClose, saveCrop, loadOriginal, _editImage } from '../../actions';

function UploadModal({ imgId, data, imageInfo, handleClose, handleCrop, clear }) {

    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true)
            var body = document.getElementsByTagName("body")
            if (body && !clear) {
                body[0].classList = "modal-open"
            }
        }, 200);

        if (imgId) imageInfo(imgId)
        if (clear) onClose()

    }, [clear])

    const onClose = () => {
        setTimeout(() => { handleClose() }, 200);
        setFadeIn(false)
        var body = document.getElementsByTagName("body")
        if (body) {
            body[0].classList = ""
        }
    }

    return (<div className="modal-cut">
        <div className={`modal fade ${fadeIn ? 'in' : null}`} id="exampleModal3" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" style={{ width: '45%' }} role="document">
                <Form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" onClick={onClose} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">
                                แก้ไขรูปภาพ</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="input-cut">
                                        <div className="title-cut">
                                            <span>Alt</span>
                                            <Field type="text" id="alt" name="alt"
                                                className="form-control" />
                                        </div>
                                        <div className="title-cut">
                                            <span>URL</span>
                                            <Field type="url" id="url" name="url"
                                                className="form-control" />
                                            <Field type="radio" id="target1" name="target" value="_self" />
                                            &nbsp; <label htmlFor="target1">เปิดทับหน้าต่างเดิม</label><br />
                                            <Field type="radio" id="target2" name="target" value="_blank" />
                                            &nbsp; <label htmlFor="target2">เปิดในหน้าต่างใหม่</label><br />
                                        </div>
                                        {/* <div className="title-cut">
                                            <span>ประเภทรูป</span>
                                            <Field type="radio" id="format1" name="format" value="jpg" />
                                            &nbsp; <label htmlFor="format1">JPG</label><br />
                                            <Field type="radio" id="format2" name="format" value="png" />
                                            &nbsp; <label htmlFor="format2">PNG</label><br />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn-rt-confirm">บันทึก</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <div className={`modal-backdrop fade ${fadeIn ? 'in' : null}`}></div>
    </div>)
}

// const urlRegExp = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
const urlRegExp = /(https?\:\/\/(?:[^\s]+))/

const UploadFormik = withFormik({
    mapPropsToValues: (props) => {
        return {
            alt: props.data.alt || "",
            url: props.data.url || "",
            target: props.data.target || "_self",
            format: props.data.format || "jpg"
        }
    },
    validationSchema: Yup.object().shape({
        url: Yup.string().matches(urlRegExp, 'Enter correct url!'),
    }),
    handleSubmit: async (values, { props }) => {
        props.editImage(Object.assign({}, values, { _id: props.data._id }))
    }
})(UploadModal)

const mapStateToProps = (state) => {
    const { setting, data, imgId } = state.upload
    return { setting, data: data || {}, imgId }
}

const mapDispatchToProps = dispatch => {
    return {
        handleClose: () => dispatch(uploadModalClose()),
        handleCrop: (id, crop, resize) => dispatch(saveCrop(id, crop, resize)),
        imageInfo: (id) => dispatch(loadOriginal(id)),
        editImage: (data) => dispatch(_editImage(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFormik)