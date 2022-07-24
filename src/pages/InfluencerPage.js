import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchInfuData } from '../actions';

import Table from '../components/table'
import { MainLayout } from '../components/layout'

function InfluencerPage({ dashboard }) {

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - Dashboard</title>
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
              <h4 className="card-title">ผู้แนะนำสินค้า</h4>
              <p className="card-description">
                สถิติการใช้งานของผู้แนะนำสินค้า
              </p>
              <div className="table-responsive">
                <Table data={dashboard.all_infu || []} rowsPerPage={100} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>);
}

const loadData = (store) => {
  return store.dispatch(fetchInfuData())
}

function limit(c) {
  return this.filter((x, i) => {
    if (i <= (c - 1)) { return true }
  })
}

Array.prototype.limit = limit;

const mapStateToProps = (state) => {
  return { dashboard: state.dashboard || {} }
}

export default {
  component: connect(mapStateToProps, null)(InfluencerPage),
  loadData: loadData,
};