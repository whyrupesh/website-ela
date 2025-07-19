import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const categories = [
  { name: 'Rings', image: 'https://res.cloudinary.com/dsihyrpw7/image/upload/v1738452908/Rings_hoyst4.jpg' },
  { name: 'Earrings', image: 'https://res.cloudinary.com/dsihyrpw7/image/upload/v1738452924/Earrings11_jfxfnc.jpg' },
  { name: 'Necklace', image: 'https://res.cloudinary.com/dsihyrpw7/image/upload/v1738452922/Necklace_z2sfjw.jpg' },
  { name: 'Bracelet', image: 'https://res.cloudinary.com/dsihyrpw7/image/upload/v1738452923/Bracelet_zdzrlg.jpg' },
  { name: 'Accessories', image: 'https://res.cloudinary.com/dsihyrpw7/image/upload/v1738452902/Accessories_yvpvlf.jpg' },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/collection', { state: { category } });
  };

  return (
    <div className='categories'>
      <div className='text-center text-3xl py-8'>
        <Title text1="CATEGORIES" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our curated collection of categories and find your perfect match.
        </p>
      </div>

      <div className='categories-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8'>
        {categories.map((category, index) => (
          <div
            key={index}
            className='category-item cursor-pointer rounded-2xl overflow-hidden transform hover:scale-105 transition-all'
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className='category-image object-cover w-full h-72'
            />
            <span className='category-name block text-center mt-4 text-lg font-semibold text-gray-700'>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
