import axios from 'axios';
import { toast } from "react-toastify";

import { _success, _error, _errorNotFound } from './request'

export const ADD_ROW = 'ADD_ROW'
export const REMOVE_ROW = 'REMOVE_ROW'
export const CHANGE_EDITOR_VALUE = 'CHANGE_EDITOR_VALUE'
export const UPDATE_ALL_ROW = 'UPDATE_ALL_ROW'
export const UPDATE_IMAGE_COVER = 'UPDATE_IMAGE_COVER'
export const UPDATE_IMAGE_POPUP = 'UPDATE_IMAGE_POPUP'
export const UPDATE_INFO_POPUP = 'UPDATE_INFO_POPUP'
export const UPDATE_INFO_MARKETING = 'UPDATE_INFO_MARKETING'
export const UPDATE_INFO_BUTTON = 'UPDATE_INFO_BUTTON'
export const FETCH_ALL_ORDER = 'FETCH_ALL_ORDER'
export const SET_PACKAGE_SALEPAGE = 'SET_PACKAGE_SALEPAGE'
export const SET_NAME_SALEPAGE = 'SET_NAME_SALEPAGE'
export const SET_DESC_SALEPAGE = 'SET_DESC_SALEPAGE'

export const _addRow = (data) => {
    return {
        type: ADD_ROW,
        payload: data
    }
}

export const _removeRow = (index) => {
    return {
        type: REMOVE_ROW,
        payload: index
    }
}

export const _change = (name, value) => {
    return {
        type: CHANGE_EDITOR_VALUE,
        payload: { name, value }
    }
}

export const _updateRows = (updateRows) => {
    return { type: UPDATE_ALL_ROW, payload: updateRows }
}

export const _updateCover = (cover) => {
    return { type: UPDATE_IMAGE_COVER, payload: cover }
}

export const _updatePopup = (data) => {
    return { type: UPDATE_IMAGE_POPUP, payload: data }
}

export const _buyPackage = (package_code, cb) => async (dispatch, getState) => {
    return await axios({ url: `/api/buy-package`, method: 'post', data: { package_code: package_code }, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { cb(res) })
        .catch(error => { toast.error(error.message) })
}

export const _attachSlip = (orderId, slip, cb) => async (dispatch, getState) => {
    return await axios({ url: `/api/attach-slip`, method: 'post', data: { orderId: orderId, slip: slip }, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { cb(res) })
        .catch(error => { toast.error(error.message) })
}

export const _saveSalePage = (data, cb) => async (dispatch, getState) => {
    return await axios({ url: `/api/save-salepage`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? cb(res) : toast.error(res.message) })
        .catch(error => { toast.error(error.message) })
}

export const _deleteSalePage = (salepage_name, cb) => async (dispatch, getState) => {
    return await axios({ url: `/api/delete-salepage/${salepage_name}`, method: 'delete', headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : dispatch(_error(res.message)) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _saveProduct = (data) => async (dispatch, getState) => {
    return await axios({ url: `/api/product`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : toast.error(res.message) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _updateProduct = (id, data) => async (dispatch, getState) => {
    return await axios({ url: `/api/product/${id}`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : toast.error(res.message) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _deleteProduct = (id) => async (dispatch, getState) => {
    return await axios({ url: `/api/product/${id}`, method: 'delete', headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : dispatch(_error(res.message)) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _submit = () => async (dispatch, getState) => {
    const { cover, rows, salepage_name } = getState().salepage
    return await axios({ url: `/api/update-salepage/${salepage_name}`, method: 'post', data: { cover, rows }, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : dispatch(_error(res.message)) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _submitPopup = (data) => async (dispatch, getState) => {
    const { popup, salepage_name } = getState().salepage
    return await axios({ url: `/api/update-salepage/${salepage_name}/popup`, method: 'post', data: { popup, popupInfo: data }, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : dispatch(_error(res.message)) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _submitMarketing = (data) => async (dispatch, getState) => {
    const { popup, salepage_name } = getState().salepage
    return await axios({ url: `/api/update-salepage/${salepage_name}/seo`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : dispatch(_error(res.message)) })
        .catch(error => { dispatch(_error(error.message)) })
}


export const _submitButton = (data) => async (dispatch, getState) => {
    const { popup, salepage_name } = getState().salepage
    return await axios({ url: `/api/update-salepage/${salepage_name}/button`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => { res.success ? dispatch(_success()) : dispatch(_error(res.message)) })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _submitPreview = () => async (dispatch, getState) => {
    const { mypackage, salepage_name } = getState().salepage
    if (mypackage.brand_name) {
        window.open(`/${mypackage.brand_name}/${salepage_name}`, '_blank');
    }
    else dispatch(_errorNotFound({ goto: '/user/brand', code: 'NotFound', error: 'ยังไม่ได้ตั้งชื่่อแบรนด์ เมนู > โปรไฟล์แบรนด์' }))
}

//##### FETCH DATA SSR WITH TOKEN #####//
export const fetchOrders = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/orders `, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data.success) {
            dispatch({ type: FETCH_ALL_ORDER, payload: res.data.data })
        }
        else {
            dispatch({ type: FETCH_ALL_ORDER, payload: [] })
        }

    } catch (error) {
        dispatch(_error(error.message))
    }
}

export const fetchPackage = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/mypackage `, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data.success) {
            dispatch({ type: FETCH_ALL_ORDER, payload: res.data.data })
        }
        else {
            dispatch({ type: FETCH_ALL_ORDER, payload: [] })
        }

    } catch (error) {
        dispatch(_error(error.message))
    }
}

export const fetchSalePage = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/mysalepage `, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data.success) {
            dispatch({ type: FETCH_ALL_ORDER, payload: res.data.data })
        }
        else {
            dispatch({ type: FETCH_ALL_ORDER, payload: [] })
        }

    } catch (error) {
        dispatch(_error(error.message))
    }
}

export const fetchMySalePage = (id) => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/mysalepage/${id}`, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data.success) {
            const { mysalepage, mypackage } = res.data.data
            dispatch({ type: UPDATE_IMAGE_COVER, payload: mysalepage.cover })
            dispatch({ type: UPDATE_ALL_ROW, payload: mysalepage.rows || [] })
            dispatch({ type: SET_PACKAGE_SALEPAGE, payload: mypackage })
            dispatch({ type: SET_NAME_SALEPAGE, payload: id })
            dispatch({ type: UPDATE_IMAGE_POPUP, payload: mysalepage.popup })
            dispatch({ type: UPDATE_INFO_POPUP, payload: mysalepage.popupInfo })
            dispatch({ type: UPDATE_INFO_MARKETING, payload: mysalepage.marketing })
            dispatch({ type: UPDATE_INFO_BUTTON, payload: mysalepage.button })
        }
        else {
            dispatch(_errorNotFound({ goto: '/user/all-salepage', code: 'NotFound', error: res.data.message }))
        }
        // else throw new Error(res.data.message);
    } catch (error) {
        dispatch(_error(error.message))
    }
}

export const fetchMyProduct = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/myproduct `, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data.success) {
            dispatch({ type: FETCH_ALL_ORDER, payload: res.data.data })
        }
        else {
            dispatch({ type: FETCH_ALL_ORDER, payload: [] })
        }

    } catch (error) {
        dispatch(_error(error.message))
    }
}

export const fetchSalepageClient = (brand_name, salepage_name) => async (dispatch, getState) => {
    try {
        const { config: { baseURL } } = getState()
        let res = await axios({ url: `${baseURL}/client/salepage/${brand_name}/${salepage_name}`, method: 'get' })
        // console.log(res.data.data)
        if (res.data.success) {
            const { mysalepage, mypackage } = res.data.data
            dispatch({ type: UPDATE_IMAGE_COVER, payload: mysalepage.cover })
            dispatch({ type: UPDATE_ALL_ROW, payload: mysalepage.rows || [] })
            dispatch({ type: SET_PACKAGE_SALEPAGE, payload: mypackage })
            dispatch({ type: SET_NAME_SALEPAGE, payload: mysalepage.name })
            dispatch({ type: SET_DESC_SALEPAGE, payload: mysalepage.detail })
            dispatch({ type: UPDATE_IMAGE_POPUP, payload: mysalepage.popup })
            dispatch({
                type: UPDATE_INFO_MARKETING, payload: {
                    salepage_title: mysalepage.salepage_title || '',
                    salepage_desc: mysalepage.salepage_desc || ''
                }
            })
            dispatch({ type: UPDATE_INFO_BUTTON, payload: mysalepage.button })
        }
        else {
            dispatch(_errorNotFound({ goto: '/', code: 'NotFound', error: res.data.message }))
        }

    } catch (error) {
        dispatch(_error(error.message))
    }
}

export const fetchShopClient = (brand_name) => async (dispatch, getState) => {
    try {
        const { config: { baseURL } } = getState()
        let res = await axios({ url: `${baseURL}/client/salepage/${brand_name}`, method: 'get' })
        if (res.data.success) {
            const { mysalepage, mypackage } = res.data.data
            dispatch({ type: UPDATE_ALL_ROW, payload: mysalepage || [] })
            dispatch({ type: SET_PACKAGE_SALEPAGE, payload: mypackage })
        }
        else {
            dispatch(_errorNotFound({ goto: '/', code: 'NotFound', error: res.data.message }))
        }

    } catch (error) {
        dispatch(_error(error.message))
    }
}