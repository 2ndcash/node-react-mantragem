import axios from 'axios';

import { _success, _error, _errorNotFound } from './request'

export const SET_ALL_CUSTOMER = 'SET_ALL_CUSTOMER'
export const SET_TOTAL_CUSTOMER = 'SET_TOTAL_CUSTOMER'
export const SET_TOTAL_SENDMAIL = 'SET_TOTAL_SENDMAIL'

export const fetchDashboardData = () => async (dispatch, getState) => {
    try {
        const { config: { baseURL }, token } = getState()
        let res = await axios({ url: `${baseURL}/api/initial-dashboard`, method: 'get', headers: { 'Authorization': `Bearer ${token}` } })

        if (res.data && res.data.success) {
            const { customers, total_customer, total_sendmail } = res.data

            dispatch({ type: SET_ALL_CUSTOMER, payload: customers || [] })
            dispatch({ type: SET_TOTAL_CUSTOMER, payload: total_customer || 0 })
            dispatch({ type: SET_TOTAL_SENDMAIL, payload: total_sendmail || 0 })
        }
    } catch (error) {
        // dispatch(_error(error.message))
        console.log('error', error)
        dispatch(_errorNotFound({ goto: '/login', code: 'NotFound' }))
    }
}