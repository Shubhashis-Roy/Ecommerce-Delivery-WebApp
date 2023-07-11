import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    // initial details
    useEffect(() => {
        if (params.slug) {
            getProduct()
        }
    }, [params.slug])

    // Get Product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-sigle-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }

    // get Similar Product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.product)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='row container mt-4'>
                <div className='col-md-6'>
                    <img
                        src={`/api/v1/product/get-photo/${product._id}`}
                        className='card-img-top'
                        alt={product.name}
                        height='420px'
                        width='360px'
                    />
                </div>
                <div className='col-md-6'>
                    <h2>  Product Details </h2>
                    <h6> Name : {product.name} </h6>
                    <h6> Description : {product.description} </h6>
                    <h6> Price : {product.price} </h6>
                    <h6> Category : {product?.category?.name} </h6>
                    <button class="btn btn-secondary ms-1">
                        ADD TO CART
                    </button>
                </div>
            </div>
            <hr />
            <div className='row container'>
                <h3> Similar Product </h3>
                {relatedProducts.length < 1 && (
                    <h5 className='text-center'>No Similar Product Found</h5>
                )}
                <div className='d-flex flex-wrap'>

                    {relatedProducts?.map(p => (
                        <div className="card m-2" style={{ width: '18rem' }} >
                            <img src={`/api/v1/product/get-photo/${p._id}`}
                                className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <p className="card-text">$ {p.price}</p>
                                <button class="btn btn-secondary ms-1">ADD TO CART</button>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </Layout>
    )
}

export default ProductDetails;