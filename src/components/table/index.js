import React, { useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';

import useTable from "../common/useTable";
import Pagination from "./Pagination"

import { _masterModalOpen } from '../../actions/modal'

const Table = ({ data, rowsPerPage }) => {
    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>วันเกิด</th>
                        <th></th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>Email</th>
                        <th>เบอร์โทร</th>
                        <th>ผู้แนะนำ</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice && slice.length > 0 ?
                            slice.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.birthday}</td>
                                    <td className="py-1">
                                        {
                                            item.picture ? <img src={`/download/${item.picture.filename}`} alt="image" />
                                                : <img src="images/dashboard/2ndcashlogo_whtbg.jpg" alt="image" />
                                        }
                                    </td>
                                    <td>{item.first_name || ''} {item.last_name || ''}</td>
                                    <td>{item.email || ''}</td>
                                    <td>{item.mobile || ''}</td>
                                    <td>{item.ref_code || ''}</td>
                                    <td>
                                        <button className="confirm-btn" onClick={() => { dispatch(_masterModalOpen()) }}>ส่ง Email</button>
                                    </td>
                                    <td>
                                        <button className="confirm-btn">ประวัติการส่ง</button>
                                    </td>
                                </tr>)
                            })
                            : null
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={page}
                totalCount={data.length}
                pageSize={rowsPerPage}
                onPageChange={page => setPage(page)}
            />
        </>
    );
};

const CardTable = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>รูปภาพ</th>
                        <th>หมายเลข</th>
                        <th>ชื่อ/หัวข้อ</th>
                        <th>เปิด/ปิด ใช้งาน</th>
                        <th>แก้ไขล่าสุด</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice && slice.length > 0 ?
                            slice.map((item, index) => {
                                return (<tr key={index}>
                                    <td className="py-1">
                                        {
                                            item.picture ? <img style={{ width: '100px', height: '100px', borderRadius: '0' }} src={`/download/${item.picture.filename}`} alt="image" />
                                                : <img style={{ width: '100px', height: '100px', borderRadius: '0' }} src="images/dashboard/2ndcashlogo_whtbg.jpg" alt="image" />
                                        }
                                    </td>
                                    <td>{item.number || ''}</td>
                                    <td>{item.title || ''}</td>
                                    <td>{item.activate ? <label className="badge badge-success">เปิด</label> : <label className="badge badge-danger">ปิด</label>}</td>
                                    <td>{item.updatedAt || ''}</td>
                                    <td>
                                        <a href={`/edit-card/${item.id}`}>แก้ไข</a>
                                        {/* {` `}|{` `}
                                        <a>ลบ</a> */}
                                    </td>
                                </tr>)
                            })
                            : null
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={page}
                totalCount={data.length}
                pageSize={rowsPerPage}
                onPageChange={page => setPage(page)}
            />
        </>
    );
};

const FormTable = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>รูปภาพ</th>
                        <th>ชื่อ/หัวข้อ</th>
                        <th>เปิด/ปิด ใช้งาน</th>
                        <th>แก้ไขล่าสุด</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slice && slice.length > 0 ?
                            slice.map((item, index) => {
                                return (<tr key={index}>
                                    <td className="py-1">
                                        {
                                            item.picture ? <img style={{ width: '150px', height: '60px', borderRadius: '0' }} src={`/download/${item.picture.filename}`} alt="image" />
                                                : <img style={{ width: '150px', height: '60px', borderRadius: '0' }} src="images/dashboard/2ndcashlogo_whtbg.jpg" alt="image" />
                                        }
                                    </td>
                                    <td>{item.title || ''}</td>
                                    <td>{item.activate ? <label className="badge badge-success">เปิด</label> : <label className="badge badge-danger">ปิด</label>}</td>
                                    <td>{item.updatedAt || ''}</td>
                                    <td>
                                        <a href={`/edit-form/${item.id}`}>แก้ไข</a>
                                        {` `}|{` `}
                                        <a href={`/external/demoform/${item.id}`} target="_blank">ดูตัวอย่าง</a>
                                    </td>
                                </tr>)
                            })
                            : null
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={page}
                totalCount={data.length}
                pageSize={rowsPerPage}
                onPageChange={page => setPage(page)}
            />
        </>
    );
};

export {
    Table,
    CardTable,
    FormTable
};