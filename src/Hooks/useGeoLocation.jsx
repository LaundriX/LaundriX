import React from 'react';
const useGeoLocation = () => {
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });
  const onSuccess = (location) => {
    setLocation((prevLocation) => {
      return {
        ...prevLocation,
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      };
    });
  };
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  React.useEffect(() => {
    if (!('geolocation' in navigator)) {
      return onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    } else navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  console.log(location);
  return location;
};

export default useGeoLocation;
