import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchDashboardData, _masterModalOpen } from '../actions';

import HistoryModal from '../components/modal/HistoryModal'

import { Table } from '../components/table'
import { MainLayout } from '../components/layout'

function DashboardPage({ dashboard, user, modal, handleOpen }) {

  const [pending, setPending] = useState(false)
  useEffect(() => {
    setPending(true)
  }, [])

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - Dashboard</title>
        <link rel="stylesheet" href="/style/modalstyle.css" />
        <link rel="stylesheet" href="/style/customstyle.css" />
        <link rel="stylesheet" href="/external/css/form-email.css" />
      </Helmet>
    );
  };

  if (!user.email) return (<MainLayout>{head()}</MainLayout>);

  return (<MainLayout>
    {head()}
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">สวัสดีคุณ {user.email}</h3>
              {/* <h6 className="font-weight-normal mb-0">คุณมี <span className="text-primary">3 ข้อความที่ยังไม่ได้อ่าน</span></h6> */}
            </div>
            <div className="col-12 col-xl-4">
              {/* <div className="justify-content-end d-flex">
                <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                  <button className="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <i className="mdi mdi-calendar" /> Today (10 Jan 2021)
              </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                    <a className="dropdown-item" href="#">January - March</a>
                    <a className="dropdown-item" href="#">March - June</a>
                    <a className="dropdown-item" href="#">June - August</a>
                    <a className="dropdown-item" href="#">August - November</a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card tale-bg">
            <div className="card-people mt-auto">
              <img src="/images/dashboard/admin.jpg" alt="people" />
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin transparent">
          <div className="row">
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-tale">
                <div className="card-body">
                  <p className="mb-4">ผู้เข้าร่วม</p>
                  <p className="fs-30 mb-2">{numberWithCommas(dashboard.total_customer)}</p>
                  <p>ราย</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-dark-blue">
                <div className="card-body">
                  <p className="mb-4">ส่ง Email</p>
                  <p className="fs-30 mb-2">{numberWithCommas(dashboard.total_sendmail)}</p>
                  <p>ราย</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
              <div className="card card-light-blue">
                <div className="card-body">
                  <p className="mb-4">พาคนไปที่หน้าร้าน</p>
                  <p className="fs-30 mb-2">0</p>
                  <p>ราย</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 stretch-card transparent">
              <div className="card card-light-danger">
                <div className="card-body">
                  <p className="mb-4">ปิดการขาย</p>
                  <p className="fs-30 mb-2">0</p>
                  <p>บาท</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">ผู้เข้าร่วม</h4>
              <p className="card-description">
                สถิติการใช้งานของผู้เข้าร่วม
              </p>
              <div className="table-responsive">
                <Table data={dashboard.customers || []} rowsPerPage={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {modal.show ? <HistoryModal /> : null}
  </MainLayout>);
}

const loadData = (store) => {
  return store.dispatch(fetchDashboardData())
}

function limit(c) {
  return this.filter((x, i) => {
    if (i <= (c - 1)) { return true }
  })
}

Array.prototype.limit = limit;

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard || {},
    user: state.user || {},
    modal: state.masterModal
  }
}

export default {
  component: connect(mapStateToProps, null)(DashboardPage),
  loadData: loadData,
};