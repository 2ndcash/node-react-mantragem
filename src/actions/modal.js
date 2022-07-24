export const MASTER_MODAL_OPEN = 'MASTER_MODAL_OPEN'
export const MASTER_MODAL_CLOSE = 'MASTER_MODAL_CLOSE'
export const MASTER_MODAL_DATA = 'MASTER_MODAL_DATA'

export const _masterModalOpen = () => {
    return {
        type: MASTER_MODAL_OPEN
    }
}

export const _masterModalClose = () => {
    return {
        type: MASTER_MODAL_CLOSE
    }
}

export const _masterModalData = (data) => {
    return {
        type: MASTER_MODAL_DATA,
        payload: data
    }
}