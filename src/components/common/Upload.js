import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import { upload } from '../../actions'

const Upload = ({ name, defaultVal, setFieldValue, onRemoveHandler, width, height }) => {

    const [fileName, setFileName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isload, setIsLoad] = useState(false)
    const token = useSelector(state => state.token)

    useEffect(() => {
        if (defaultVal) {
            setFileName(`/download/${defaultVal.filename}`)
            setFieldValue(name, defaultVal._id);
        }
    }, [])

    const handleChange = async (event) => {
        const { name, files } = event.currentTarget
        if (files.length > 0) {

            var formdata = new FormData();
            formdata.append('file', files[0]);

            setIsLoad(true)
            const { data } = await upload(formdata, token)
            if (data.success) {
                // const { _id, imgSrc, originalName, locationUrl } = data.data
                const image = data.image

                setFileName(`/download/${image.filename}`)
                setFieldValue(name, image._id);
            }
            else {
                setFileName(null)
                setErrorMessage(data.message)
                setTimeout(() => {
                    setErrorMessage(null)
                    event.target.value = null;
                }, 10000);
            }
            setIsLoad(false)
        }
    }

    const handleRemove = () => {
        setFieldValue(name, null);
        setFileName(null)
    }

    return (<>
        <input type="file" name={name} id={name} style={{ display: 'none' }}
            accept="image/x-png,image/gif,image/jpeg"
            onChange={handleChange}
            hidden />
        {
            fileName ?
                <>
                    <img src={fileName} alt="" width={width || '100'} height={height || '100'} />
                    {typeof onRemoveHandler == "function" ? <a onClick={onRemoveHandler}>{` `}ลบ</a> : <a onClick={handleRemove}>{` `}ลบ</a>}
                </>
                :
                <label htmlFor={!isload? name : null} className="btn btn-sm btn-danger btn-icon-text">
                    <i className="ti-upload btn-icon-prepend"></i>
                    {isload ? 'Uploading' : 'Upload'}
                </label>
        }
        {errorMessage ? <span className="text-danger" style={{ paddingLeft: '5px', paddingTop: '10px' }}>{` `}{errorMessage}</span> : null}
    </>)
}

export default Upload