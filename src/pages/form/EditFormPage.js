import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withFormik, Form, Field, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';

import { _editMoreForm, _fetchMoreFormData } from '../../actions';
import Upload from '../../components/common/Upload';
import Editor from '../../components/common/Editor'
import { MainLayout } from '../../components/layout'

function EditFormPage({ touched, errors, form, values, setFieldValue }) {

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - Add Form</title>
        <link rel="stylesheet" href="/style/customstyle.css" />
        <link rel="stylesheet" href="/style/react-draft-wysiwyg.css" />
      </Helmet>
    );
  };

  return (<MainLayout>
    {head()}
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Form </div>
              <p className="card-description">Basic form layout</p>
              <Form className="forms-sample">
                <div className="box-bg">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">อัพโหลดรูปปก ( ขนาด 2560 x 600 )</label>
                    <div className="col-sm-9">
                      <Upload name={`picture`}
                        defaultVal={form.picture}
                        setFieldValue={setFieldValue} width={250} height={100} />
                      {touched.picture && errors.picture && <label className="text-danger">{` `}{errors.picture}</label>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">หัวข้อ</label>
                    <div className="col-sm-9">
                      <Field name="title" placeholder="Title" className="form-control" type="text" />
                      {touched.title && errors.title && <label className="text-danger">{` `}{errors.title}</label>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">รายละเอียดโครงการ</label>
                    <div className="col-sm-9 layout-box">
                      <div className="box-s4">
                        <Editor name={`content`} defaultVal={form.content || null} setValue={setFieldValue} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row" style={{ display: 'none' }}>
                    <label className="col-sm-3 col-form-label">Content (HTML)</label>
                    <div className="col-sm-9 layout-box">
                      <textarea style={{ width: '100%', maxWidth: '100%' }} rows={10}
                        disabled
                        value={form.content}
                      />
                    </div>
                  </div>

                  <p className="card-description">ข้อมูลที่คุณต้องการจัดเก็บ</p>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Field</label>
                    <div className="col-sm-4">
                      <div className="form-check form-check-primary">
                        <label className="form-check-label">
                          <Field type="checkbox" name="opt_fullname" className="form-check-input" />
                          ชื่อ-นามสกุล <i className="input-helper" />
                        </label>
                      </div>
                      <div className="form-check form-check-primary">
                        <label className="form-check-label">
                          <Field type="checkbox" name="opt_address" className="form-check-input" />
                          ที่อยู่ <i className="input-helper" />
                        </label>
                      </div>
                      <div className="form-check form-check-primary">
                        <label className="form-check-label">
                          <Field type="checkbox" name="opt_card_id" className="form-check-input" />
                          เลขบัตรประชาชน <i className="input-helper" />
                        </label>
                      </div>
                      <div className="form-check form-check-primary">
                        <label className="form-check-label">
                          <Field type="checkbox" name="opt_bank" className="form-check-input" />
                          ธนาคาร <i className="input-helper" />
                        </label>
                      </div>
                      <div className="form-check form-check-primary">
                        <label className="form-check-label">
                          <Field type="checkbox" name="opt_bank_name" className="form-check-input" />
                          เลขบัญชีธนาคาร <i className="input-helper" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <p className="card-description">เผยแพร่</p>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Publish</label>
                    <div className="col-sm-4">
                      <div className="form-check form-check-info">
                        <label className="form-check-label">
                          <Field type="checkbox" name="activate" className="form-check-input" />
                          {/* Info <i className="input-helper" /> */}
                        </label>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button type="button" onClick={() => { window.location = '/form-list' }} className="btn btn-light">Cancel</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>);
}


const AddCardFormik = withFormik({
  mapPropsToValues: ({ form }) => {
    return {
      picture: form.picture || '',
      title: form.title || '',
      content: form.content || '',
      opt_fullname: form.opt_fullname || false,
      opt_address: form.opt_address || false,
      opt_card_id: form.opt_card_id || false,
      opt_bank: form.opt_bank || false,
      opt_bank_name: form.opt_bank_name || false,
      activate: form.activate || false
    }
  },
  validationSchema: Yup.object().shape({
    picture: Yup.string().nullable().required('ระบุ Picture'),
    title: Yup.string().required('ระบุ Title'),
  }),
  handleSubmit: async (values, { props }) => {
    props.submitHandler(props.form.id, values)
  }
})(EditFormPage)

const loadData = (store, match) => {
  const { id } = match.params
  if (id) return store.dispatch(_fetchMoreFormData(id))
}

const mapStateToProps = (state) => {
  const { moreform } = state.table
  return { form: moreform || {} }
}

const mapDispatchToProps = dispatch => {
  return {
    submitHandler: (id, data) => dispatch(_editMoreForm(id, data))
  }
}
export default {
  component: connect(mapStateToProps, mapDispatchToProps)(AddCardFormik),
  loadData: loadData,
};