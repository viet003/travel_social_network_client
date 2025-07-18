import React, { useState, useEffect, useRef } from 'react';
import { searchCities, getPopularCities, formatCityData } from '../../services/geoService';
import { IoLocationOutline } from 'react-icons/io5';

const LocationDropdown = ({ value, onChange, placeholder = "Enter your location", type = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popularCities, setPopularCities] = useState([]);
  const dropdownRef = useRef(null);

  // Load popular cities on component mount
  useEffect(() => {
    const loadPopularCities = async () => {
      try {
        const cities = await getPopularCities(15);
        const formattedCities = formatCityData(cities);
        setPopularCities(formattedCities);
      } catch (error) {
        console.error('Error loading popular cities:', error);
      }
    };

    loadPopularCities();
  }, []);

  // Search cities when search term changes
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        setLoading(true);
        try {
          const searchResults = await searchCities(searchTerm, 10);
          const formattedResults = formatCityData(searchResults);
          setCities(formattedResults);
        } catch (error) {
          console.error('Error searching cities:', error);
          setCities([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCities([]);
        setLoading(false);
      }
    }, 300); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    
    // If user clears the input, also clear the selected value
    if (!newValue) {
      onChange('');
    }
  };

  const handleCitySelect = (city) => {
    onChange(city.value);
    setSearchTerm(city.label);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (!searchTerm && popularCities.length > 0) {
      setCities(popularCities);
    }
  };

  const displayValue = value || searchTerm;

  return (
    <div className={`${type ? "text-sm" : "text-md"}`} ref={dropdownRef}>
      <div className="relative">
        <IoLocationOutline className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={`w-full py-2 pl-10 pr-3 ${type ? "border-none" : "border"} border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200`}
          autoComplete="off"
        />
        {loading && (
          <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
            <div className="w-4 h-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (cities.length > 0 || loading) && (
        <div className="absolute z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-60">
          {loading ? (
            <div className="p-3 text-center text-gray-500">
              <div className="w-6 h-6 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
              Searching cities...
            </div>
          ) : (
            <div>
              {cities.length === 0 && searchTerm.length >= 2 && (
                <div className="p-3 text-center text-gray-500">
                  No cities found for "{searchTerm}"
                </div>
              )}
              
              {cities.map((city, index) => (
                <div
                  key={`${city.city}-${city.country}-${index}`}
                  className="px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 last:border-b-0"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="font-medium text-gray-900">{city.city}</div>
                  <div className="text-sm text-gray-500">
                    {city.region && `${city.region}, `}{city.country}
                    {city.population && (
                      <span className="ml-2 text-xs text-gray-400">
                        ({city.population.toLocaleString()})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown; 