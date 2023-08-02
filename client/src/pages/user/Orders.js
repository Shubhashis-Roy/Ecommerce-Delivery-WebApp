import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import UserManu from '../../components/Layout/UserManu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    // Get Orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={""}>
            <div className='container-flui p-3 m-3 '>
                <div className='row'>
                    <div className='col-md-3'>
                        < UserManu />
                    </div>
                    <div className='col-md-9'>
                        <h4 className='text-center'>All Orders</h4>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className='border shadow'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <td scope='col'>#</td>
                                                    <td scope='col'>Status</td>
                                                    <td scope='col'>Buyer</td>
                                                    <td scope='col'>Order date</td>
                                                    <td scope='col'>Payment</td>
                                                    <td scope='col'>Quantity</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th> {i + 1} </th>
                                                    <th> {o?.status} </th>
                                                    <th> {o?.buyer?.name} </th>
                                                    <th> {moment(o?.createAt).fromNow()} </th>
                                                    <th> {o?.payment.success ? "Success" : "Failed"} </th>
                                                    <th> {o?.products?.length} </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='container'>
                                            {o?.products.map((p, i) => (
                                                <div className='row mb-2 card flex-row'>
                                                    <div className='col-md-4'>
                                                        <img src={`/api/v1/product/get-photo/${p._id}`}
                                                            className="card-img-top" alt={p.name} />
                                                    </div>
                                                    <div className='col-md-4 mt-3'>
                                                        <h6> {p.name} </h6>
                                                        <h6> {p.description} </h6>
                                                        <h6> Price: $ {p.price} </h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        }

                        {/* <p> {JSON.stringify(orders, null, 4)} </p> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders;