import axios from 'axios';

import { _success, _successAndGoto, _error, _errorNotFound } from './request'

export const SET_DATA_MORE_FORM = 'SET_DATA_MORE_FORM'
export const SET_DATA_ALL_MORE_FORM  = 'SET_DATA_ALL_MORE_FORM'

export const _fetchMoreFormData = (id) => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/data-moreform/${id}`, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data && res.data.success) {
            const { more_form } = res.data
            
            dispatch({ type: SET_DATA_MORE_FORM, payload: more_form })
        }

    } catch (error) {
        console.log(error)
        dispatch(_errorNotFound({ goto: '/login', code: 'NotFound' }))
    }
}

export const _fetchAllMoreForm = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/moreform-list`, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data && res.data.success) {
            const { more_forms } = res.data

            dispatch({ type: SET_DATA_ALL_MORE_FORM, payload: more_forms || [] })
        }

    } catch (error) {
        console.log(error)
        dispatch(_errorNotFound({ goto: '/login', code: 'NotFound' }))
    }
}

export const _addMoreForm = (data) => async (dispatch, getState) => {
    return await axios({ url: `/api/add-moreform`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => {
            if (res.success) {
                dispatch(_successAndGoto('/form-list'))
            } else {
                dispatch(_error(res.message))
            }
        })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _editMoreForm = (id, data) => async (dispatch, getState) => {
    return await axios({ url: `/api/edit-moreform/${id}`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => {
            if (res.success) {
                dispatch(_successAndGoto('/form-list'))
            } else {
                dispatch(_error(res.message))
            }
        })
        .catch(error => { dispatch(_error(error.message)) })
}