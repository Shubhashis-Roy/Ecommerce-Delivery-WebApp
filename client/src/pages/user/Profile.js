import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserManu from '../../components/Layout/UserManu';

const Profile = () => {
    return (
        <Layout>
            <div className='container-flui p-3 m-3 '>
                <div className='row'>
                    <div className='col-md-3'>
                        < UserManu />
                    </div>
                    <div className='col-md-9'>
                        <h4>Your Profile</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;