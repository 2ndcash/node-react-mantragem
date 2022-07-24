export const REQUEST_ERROR = 'REQUEST_ERROR'
export const REQUEST_ERROR_NOTFOUND = 'REQUEST_ERROR_NOTFOUND'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_SUCCESS_GOTO = 'REQUEST_SUCCESS_GOTO'
export const REQUEST_CLEAR_ERROR = 'REQUEST_CLEAR_ERROR'
export const REQUEST_STARTED = 'REQUEST_STARTED'
export const REQUEST_STOPPED = 'REQUEST_STOPPED'


export const _success = () => {
    return {
        type: REQUEST_SUCCESS
    }
}

export const _error = (error) => {
    return {
        type: REQUEST_ERROR,
        payload: error
    }
}

export const _errorNotFound = ({ goto, error }) => {
    return {
        type: REQUEST_ERROR_NOTFOUND,
        payload: { goto: goto, message: error }
    }
}

export const _clearError = (error) => {
    return {
        type: REQUEST_CLEAR_ERROR
    }
}

export const _requestStart = (message) => {
    return {
        type: REQUEST_STARTED,
        payload: message || null
    }
}

export const _requestEnd = () => {
    return {
        type: REQUEST_STOPPED
    }
}

export const _successAndGoto = (goto) => {
    return {
        type: REQUEST_SUCCESS_GOTO,
        payload: { goto: goto }
    }
}
