import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Spinner from '../Components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  return loading ? (
    <Spinner />
  ) : (
    <main>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='swiper-container'
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index} className='swiperSlideDiv'>
              <img
                className='swiperSlideImg'
                src={listing.imgUrls[index]}
                alt={`house img ${index}`}
              />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);

          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt='share icon' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>

        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms} Bedroom{listing.bedrooms > 1 && 's'}
          </li>
          <li>
            {listing.bathrooms} Bathroom{listing.bathrooms > 1 && 's'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>

        {listing?.geolocation?.lat !== undefined &&
          listing?.geolocation?.lng !== undefined && (
            <div className='leafletContainer'>
              <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={[listing.geolocation.lat, listing.geolocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                />

                <Marker
                  position={[listing.geolocation.lat, listing.geolocation.lng]}
                >
                  <Popup>{listing.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
