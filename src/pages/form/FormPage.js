import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { _fetchAllMoreForm } from '../../actions';

import { FormTable } from '../../components/table'
import { MainLayout } from '../../components/layout'

function FormPage({ table }) {

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - Form List</title>
      </Helmet>
    );
  };

  return (<MainLayout>
    {head()}
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-9 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <a href="/add-form" className="btn btn-primary float-right">สร้าง Form ใหม่</a>
              <h4 className="card-title">Form List</h4>
              <p className="card-description">
                รายการฟอร์ม
              </p>
              <div className="table-responsive">
                <FormTable data={table.moreforms || []} rowsPerPage={100} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  </MainLayout>);
}

const loadData = (store) => {
  return store.dispatch(_fetchAllMoreForm())
}

function limit(c) {
  return this.filter((x, i) => {
    if (i <= (c - 1)) { return true }
  })
}

Array.prototype.limit = limit;

const mapStateToProps = (state) => {
  return { table: state.table || {} }
}

export default {
  component: connect(mapStateToProps, null)(FormPage),
  loadData: loadData,
};