import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withFormik, Form, Field, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';

import { _addCardForm, _fetchCardData } from '../../actions';
import Upload from '../../components/common/Upload';
import { MainLayout } from '../../components/layout'

function AddCardPage({ touched, errors, form, values, setFieldValue }) {

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - Add Card</title>
      </Helmet>
    );
  };

  return (<MainLayout>
    {head()}
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Card Form</div>
              <p className="card-description">Basic form layout</p>
              <Form className="forms-sample">
                <div className="box-bg">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Picture</label>
                    <div className="col-sm-9">
                      <Upload name={`picture`}
                        defaultVal={form.picture}
                        setFieldValue={setFieldValue} />
                      {touched.picture && errors.picture && <label className="text-danger">{` `}{errors.picture}</label>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                      <Field name="title" placeholder="Title" className="form-control" type="text" />
                      {touched.title && errors.title && <label className="text-danger">{` `}{errors.title}</label>}
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
                  <button type="button" onClick={() => { window.location = '/card-list' }} className="btn btn-light">Cancel</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>);
}

const numberRegExp = /^[0-9]*$/

const AddCardFormik = withFormik({
  mapPropsToValues: ({ form }) => {
    return {
      picture: form.picture || '',
      title: form.title || '',
      number: form.number || '',
      activate: form.activate || false
    }
  },
  validationSchema: Yup.object().shape({
    picture: Yup.string().required('ระบุ Picture'),
    title: Yup.string().required('ระบุ Title'),
    number: Yup.string().required('ระบุ Number').matches(numberRegExp, 'ระบุเป็นตัวเลขเต็มจำนวน'),
  }),
  handleSubmit: async (values, { props }) => {
    props.submitHandler(values)
  }
})(AddCardPage)

const loadData = (store, match) => {
  // const { id } = match.params
  // if (id) return store.dispatch(_fetchCardData(id))
}

const mapStateToProps = (state) => {
  const { card } = state.table
  return { form: card || {} }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchDataHandler: () => dispatch(fetchMyProfileData()),
    submitHandler: (data) => dispatch(_addCardForm(data))
  }
}
export default {
  component: connect(mapStateToProps, mapDispatchToProps)(AddCardFormik),
  loadData: loadData,
};