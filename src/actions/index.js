import axios from 'axios';
import LocalStorageService from '../localStorageService'

export * from './request'
export * from './user'
export * from './upload'
export * from './salepage'
export * from './modal'
export * from './card'
export * from './moreForm'


const localStorageService = LocalStorageService.getService();

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ROLES_MENU = 'SET_ROLES_MENU'
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE'
export const SET_USER_ID = 'SET_USER_ID'

export const SET_TYPE = 'SET_TYPE'
export const CLEAR_TYPE = 'CLEAR_TYPE'
export const SET_AGREE = 'SET_AGREE'
export const END_AGREE = 'END_AGREE'
export const NEXT_STEP = 'NEXT_STEP'
export const BACK_STEP = 'BACK_STEP'
export const SET_EMAIL = 'SET_EMAIL'

export const VERIFY_COMPLETED = 'VERIFY_COMPLETED'
export const VERIFY_FAILED = 'VERIFY_FAILED'

export const SET_BASE_URL = 'SET_BASE_URL'

export const ADD_INTEREST = 'ADD_INTEREST'
export const REMOVE_INTEREST = 'REMOVE_INTEREST'

export const UPLOAD_IMAGE_TEMP = 'UPLOAD_IMAGE_TEMP'
export const DELETE_IMAGE_TEMP = 'DELETE_IMAGE_TEMP'
export const DELETE_IMAGE = 'DELETE_IMAGE'
export const DELETE_COLLECTION = 'DELETE_COLLECTION'

export const authLogin = (credentials) => {
    return axios({ url: '/auth/authenticate', method: 'post', data: credentials }).then(res => {
        const data = {
            access_token: res.data.token,
            refresh_token: res.data.token
        }
        localStorageService.setToken(data)
        return Promise.resolve(res)
    }).catch(err => {
        return Promise.reject(err)
    })
}