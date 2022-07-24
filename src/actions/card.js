import axios from 'axios';

import { _success, _successAndGoto, _error, _errorNotFound } from './request'

export const SET_DATA_CARD = 'SET_DATA_CARD'
export const SET_DATA_ALL_CARD = 'SET_DATA_ALL_CARD'

export const _fetchCardData = (id) => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/data-card/${id}`, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data && res.data.success) {
            const { card } = res.data

            dispatch({ type: SET_DATA_CARD, payload: card })
        }

    } catch (error) {
        console.log(error)
        dispatch(_errorNotFound({ goto: '/login', code: 'NotFound' }))
    }
}

export const _fetchAllCard = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/card-list`, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data && res.data.success) {
            const { cards } = res.data

            dispatch({ type: SET_DATA_ALL_CARD, payload: cards || [] })
        }

    } catch (error) {
        console.log(error)
        dispatch(_errorNotFound({ goto: '/login', code: 'NotFound' }))
    }
}

export const _addCardForm = (data) => async (dispatch, getState) => {
    return await axios({ url: `/api/add-card`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => {
            if (res.success) {
                dispatch(_successAndGoto('/card-list'))
            } else {
                dispatch(_error(res.message))
            }
        })
        .catch(error => { dispatch(_error(error.message)) })
}

export const _editCardForm = (id, data) => async (dispatch, getState) => {
    return await axios({ url: `/api/edit-card/${id}`, method: 'post', data: data, headers: { 'Authorization': `Bearer ${getState().token}` } })
        .then(res => { return res.data })
        .then(res => {
            if (res.success) {
                dispatch(_successAndGoto('/card-list'))
            } else {
                dispatch(_error(res.message))
            }
        })
        .catch(error => { dispatch(_error(error.message)) })
}