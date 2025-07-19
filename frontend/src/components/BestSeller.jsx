import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-20">
      <div className="text-center">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 md:w-1/2 mx-auto text-base md:text-lg text-gray-700 mt-3">
          Explore our top-selling products, handpicked just for you!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-10 mt-12">
        {bestSeller.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
            <h3 className="mt-3 text-lg md:text-xl font-semibold text-gray-900">{item.name}</h3>
            <p className="text-md md:text-lg font-bold text-red-600">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
