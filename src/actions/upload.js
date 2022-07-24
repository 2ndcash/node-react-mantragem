import axios from 'axios';
import { toast } from "react-toastify";

import { _success, _error } from './request'

export const UPLOAD_IMAGE_OPEN = 'UPLOAD_IMAGE_OPEN'
export const UPLOAD_IMAGE_CLOSE = 'UPLOAD_IMAGE_CLOSE'
export const UPLOAD_IMAGE_EDIT = 'UPLOAD_IMAGE_EDIT'
export const UPLOAD_IMAGE_NEW = 'UPLOAD_IMAGE_NEW'
export const UPLOAD_IMAGE_SAVE = 'UPLOAD_IMAGE_SAVE'
export const UPLOAD_IMAGE_CROP = 'UPLOAD_IMAGE_CROP'
export const UPLOAD_IMAGE_INFO = 'UPLOAD_IMAGE_INFO'
export const UPLOAD_IMAGE_CLEAR = 'UPLOAD_IMAGE_CLEAR'

export const uploadModalOpen = (imgId) => {
    return { type: UPLOAD_IMAGE_OPEN, payload: imgId }
}

export const uploadModalClose = () => {
    return { type: UPLOAD_IMAGE_CLOSE }
}

export const uploadModalClear = () => {
    return { type: UPLOAD_IMAGE_CLEAR }
}

export const saveCrop = (id, crop, resize) => async (dispatch, getState) => {
    return await axios({ url: `/api/croporiginal`, method: 'post', data: { id, crop, resize }, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
}

export const loadOriginal = (id) => async (dispatch, getState) => {
    return await axios({ url: `/api/image-info/${id}`, method: 'get', headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { dispatch({ type: UPLOAD_IMAGE_INFO, payload: res.data }) })
        .catch(err => { toast.error(err); })
}

export const _editImage = (data) => async (dispatch, getState) => {
    return await axios({ url: `/api/image-info`, method: 'post', data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { dispatch(uploadModalClear()) })
        .catch(err => { toast.error(err); })
}

export const upload = async (formData, token) => {
    return await axios({ url: `/api/upload`, method: 'post', data: formData, headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
}

// const _removeClassModel = () => {
//     var body = document.getElementsByTagName("body")
//     if (body) {
//         body[0].classList = ""
//     }
// }