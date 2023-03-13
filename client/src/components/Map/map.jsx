import React, {useEffect, useState} from 'react'
import { GoogleMap, useLoadScript, Marker, } from '@react-google-maps/api';
import { Box, width } from '@pankod/refine-mui';
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";


const Mapgoogle = (props) => {
  const { propertyDetails } = props;

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    if (propertyDetails?.lat && propertyDetails?.lng) {
      setCoordinates({
        lat: propertyDetails.lat,
        lng: propertyDetails.lng,
      });
    }
  }, [propertyDetails]);
    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY});
  
    const containerStyle = {
      width: '400px',
      height: '400px'
    };
   
    
  return (
  <Box>
    {isLoaded ? (
      <GoogleMap
        zoom={12}
        center={coordinates}
        mapContainerStyle={containerStyle}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    ) : (
      <div>Loading...</div>
    )}
  </Box>
  )
}

export default Mapgoogle