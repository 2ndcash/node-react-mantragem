import '@babel/polyfill'
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { _clearError } from '../../actions'
// import PendingModal from '../modal/PendingModal'

const MySwal = withReactContent(Swal);

const Alert = () => {

    const dispatch = useDispatch()
    const { success, error, message, code, pending, goto } = useSelector(state => state.request)

    const onSuccessHandler = async () => {
        const { value } = await MySwal.fire({
            icon: 'success',
            title: 'Successful',
        })

        setTimeout(() => {
            if (goto) window.location.href = goto
            else window.location.reload()
        }, 100);
    }

    const onErrorHandler = async () => {
        const { value } = await MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        })

        dispatch(_clearError())
    }

    const onErrorNotFoundHandler = async () => {
        const { value } = await MySwal.fire({
            icon: 'error',
            title: code || 'Error',
            text: message
        })

        setTimeout(() => {
            if (goto) window.location.href = goto
            else window.location.href = '/'
        }, 200);
    }

    if (success) onSuccessHandler()

    if (error && !code) onErrorHandler()

    if (error && code) onErrorNotFoundHandler()

    // if (pending) return <PendingModal />

    return null;
}

export default Alert