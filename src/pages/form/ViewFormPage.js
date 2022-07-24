import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withFormik, Form, Field, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import parse from 'html-react-parser';

import { _editMoreForm, _fetchMoreFormData } from '../../actions';
import { ClientMainLayout } from '../../components/layout'

function ViewFormPage({ touched, errors, form, values, setFieldValue }) {

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - View Form</title>
        <link rel="stylesheet" href="/external/style/customstyle.css" />
      </Helmet>
    );
  };

  const convertHtmlImages = (htmlText) => {

    const regex = /text-align:none;/g;
    htmlText = htmlText.replace(regex, 'text-align:center;')

    return htmlText;
  }

  return (<ClientMainLayout>
    {head()}
    <section>
      <div className="wrapper-cover">
        <div className="layout-cover">
          <div className="box-banner-home2">
            {form.picture ? <a><img src={`/download/${form.picture.filename}`} alt="" /></a> : null}
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="box-detail-email">
        <div className="container">
          <h2>ผลคำทำนายของคุณ</h2>
          <div className="box-detail">
            {parse(convertHtmlImages(form.content))}
          </div>
        </div>
      </div>
    </section>
  </ClientMainLayout>);
}

const AddCardFormik = withFormik({
  mapPropsToValues: ({ form }) => {
    return {
      picture: form.picture ? form.picture._id : '',
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
    picture: Yup.string().required('ระบุ Picture'),
    title: Yup.string().required('ระบุ Title'),
  }),
  handleSubmit: async (values, { props }) => {
    props.submitHandler(props.form.id, values)
  }
})(ViewFormPage)

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