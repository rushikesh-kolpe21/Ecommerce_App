import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export const Verify = () => {
    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyStripePayment = async () => {  
        try {
            if(!token){
                return null
            }

            // Check if payment was successful
            if(success === 'true' && orderId) {
                const response = await axios.post(
                    backendUrl + '/api/order/verify-stripe-payment',
                    { orderId, success },
                    {
                        headers: {  
                            'authorization': token
                        }
                    }
                );
                
                if(response.data.success) {
                    setCartItems({});
                    navigate('/orders');
                } else {
                    navigate('/cart');
                }
            } else {
                // Payment was not successful or missing orderId
                navigate('/cart');
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate('/cart');
        }
    }

    useEffect(() => {
        if(token) {
            verifyStripePayment();
        }
    }, [token, success, orderId]);

  return (
    <div></div>
  )
}

export default Verify;