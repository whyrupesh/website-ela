import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className=' overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      <div className="text-center mt-3">
                <p className="font-semibold text-lg text-gray-800">{name}</p>
                <p className="font-bold text-xl text-indigo-600 mt-2">{currency}{price}</p>
              </div>
    </Link>
  )
}

export default ProductItem
