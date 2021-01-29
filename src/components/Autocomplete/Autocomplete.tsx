/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { AutocompletePrediction } from '../../types/Autocomplete';
import { Change } from '../../types/Events';

import './Autocomplete.css';

const Autocomplete = (): JSX.Element => {
  console.log('autocomplete');
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const searchRef = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: Change): void => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }: AutocompletePrediction) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        // panTo({ lat, lng });
        console.log('📍 Coordinates: ', { lat, lng }, description);
      })
      .catch(error => {
        console.log('😱 Error: ', error);
      });
  };

  const renderSuggestions = (): JSX.Element[] =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          onKeyPress={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="search" ref={searchRef}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default Autocomplete;
