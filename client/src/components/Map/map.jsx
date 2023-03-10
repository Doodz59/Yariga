import React, {useEffect, useState} from 'react'
import { GoogleMap, useLoadScript, Marker, Geocoder} from '@react-google-maps/api';
import { Box, width } from '@pankod/refine-mui';
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";


const Mapgoogle = (props) => {
  const { propertyDetails } = props;

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY});
  
    const containerStyle = {
      width: '400px',
      height: '400px'
    };
    useEffect(() => {
      if (window.google) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: propertyDetails }, (results, status) => {
          if (status === 'OK') {
            const { lat, lng } = results[0].geometry.location;
            setCoordinates({ lat: lat(), lng: lng() });
          } else {
            console.error('Adresse non valide');
          }
        });
      }
    }, [propertyDetails]);
    if(!isLoaded) {
      return <div>Loading...</div>
    }
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  return (
    <GoogleMap zoom={10}
    center={coordinates}
     
    mapContainerStyle={containerStyle}
    ><Marker position={coordinates} />
    </GoogleMap>
  )
}

export default Mapgoogle