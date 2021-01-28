import React, { useEffect } from 'react';
import useScript from '../hooks/useScript';
import Autocomplete from './Autocomplete';
import Map from './Map';

declare const GMaps: Record<string, unknown>;

const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;

const App = (): JSX.Element => {
  const status = useScript(url);

  useEffect(() => {
    if (typeof GMaps !== 'undefined') {
      // GMaps is loaded => print the version
      alert(status);
    }
  }, [status]);

  return (
    <>
      {status === 'ready' && (
        <>
          <Autocomplete />
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={false} />
        </>
      )}
    </>
  );
};

export default App;
