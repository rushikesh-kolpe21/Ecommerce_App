import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';

export const Product = () => {

  const {productId} = useParams();
  const {product} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  
  const fetchProductData = () => {
      product.map((item)=>{
        if(item._id === productId){
          setProductData(item);
          console.log(item)
          return null;
        }
      })
  }

  return (
    <div>Product</div>
  )
}
