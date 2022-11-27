import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Spinner from './Spinner';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getListing = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    getListing();
  }, []);

  if(listings?.length === 0){
    return <></>;
  }
  
  return loading ? (
    <Spinner />
  ) : (
    <>
      <p className='exploreHeading'>Recommended</p>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='swiper-container'
      >
        {listings.map(({ data, id }) => (
          <SwiperSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${id}`)}
            className='swiperSlideDiv'
          >
            <img src={data.imgUrls[0]} alt='' className='swiperSlideImg' />
            <p className='swiperSlideText'>{data.name}</p>
            <p className='swiperSlidePrice'>
              ${data.discountedPrice ?? data.regularPrice}{' '}
              {data.type === 'rent' && '/ month'}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
