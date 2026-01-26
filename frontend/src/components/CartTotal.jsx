import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';

export const CartTotal = () => {
    const {getTotalAmount, currency, delivery_fee} = useContext(ShopContext);
  return (
    <div>
        <div className="w-full">
  <div className="text-2xl">
    <Title text1={"CART"} text2={"TOTALS"} />
  </div>
</div>

<div className="flex flex-col gap-2 mt-2 text-sm">
  <div className="flex justify-between">
    <p>Subtotal</p>
    <p>{currency} {getTotalAmount()}.00</p>
  </div>

  <hr />

  <div className="flex justify-between">
    <p>Shipping Fee</p>
    <p>{currency} {delivery_fee}</p>
  </div>

  <hr />

  <div className="flex justify-between">
    <b>Total</b>
    <b>
      {currency}{" "}
      {getTotalAmount() === 0 ? 0 : getTotalAmount() + delivery_fee}
    </b>
  </div>
</div>

    </div>
  )
}
