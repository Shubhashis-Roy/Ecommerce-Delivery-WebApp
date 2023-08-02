import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params?.slug) {
            getProductByCategory()
        }
    }, [params?.slug])

    const getProductByCategory = async (req, res) => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProduct(data?.product)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='container mt-3'>
                <h3 className='text-center'> Category - {category?.name} </h3>
                <h5 className='text-center'>{product?.length} results found </h5>

                <div className='row'>

                    <div className='col-md-9'>
                        <div className='d-flex flex-wrap'>

                            {product?.map(p => (
                                <div className="card m-2" style={{ width: '18rem' }} >
                                    <img src={`/api/v1/product/get-photo/${p._id}`}
                                        className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">$ {p.price}</p>
                                        <button
                                            class="btn btn-primary"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button class="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* <div className='m-2 p-3'>
                        {product && product.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? 'Loading...' : 'Loadmore . . .'}
                            </button>
                        )}
                    </div> */}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct;