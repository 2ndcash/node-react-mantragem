import React from 'react'
import { Helmet } from 'react-helmet';
import { authLogin } from '../actions';

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { MainLayout } from '../components/layout'

function LoginPage(props) {

  const { touched, errors } = props;

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - เข้าสู่ระบบ</title>
      </Helmet>
    );
  };

  return (<MainLayout>
    {head()}
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-6 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="/images/2Cash_green.png" alt="logo" />
                </div>
                <h4 className="font-weight-light">เข้าสู่ระบบ</h4>
                <Form className="pt-3">
                  <div className="form-group">
                    <Field type="text" name="email" className="form-control form-control-lg" placeholder="ชื่อผู้ใช้ (อีเมล)" />
                    {touched.email && errors.email && <label className="text-danger">{errors.email}</label>}
                  </div>
                  <div className="form-group">
                    <Field type="password" name="password" className="form-control form-control-lg" placeholder="รหัสผ่าน" />
                    {touched.password && errors.password && <label className="text-danger">{errors.password}</label>}
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">เข้าสู่ระบบ</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>)
}

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
      password: props.password || ''
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('โปรดกรอกอีเมล'),
    password: Yup.string().required('โปรดกรอกรหัสผ่าน')
  }),
  handleSubmit: (values) => {
    authLogin(values).then(res => {
      window.location = '/'
    }).catch(err => {
      if (err.response) alert(err.response.data.message)
    })
  }
})(LoginPage)

export default {
  component: LoginFormik,
  // loadData: loadData,
};