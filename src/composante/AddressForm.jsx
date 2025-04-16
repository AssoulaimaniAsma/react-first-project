import React, { useState } from 'react';

export const AddressForm = () => {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [commune, setCommune] = useState('');
  const [street, setStreet] = useState('');
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleCheckboxChange = () => {
    const newValue = !showCoordinates;

    if (newValue) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
          setShowCoordinates(true);
        },
        (error) => {
          console.error('Location permission denied:', error.message);
          setShowCoordinates(false);
        }
      );
    } else {
      setShowCoordinates(false);
      setLongitude('');
      setLatitude('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      street,
      region,
      province,
      commune,
      latitude: showCoordinates ? latitude : null,
      longitude: showCoordinates ? longitude : null,
      isDefault,
      isCoordinateActivated: showCoordinates,
    };

    console.log('Form Data:', formData);

    // Optional: Send JSON to API
    // fetch('/api/save-address', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-[#FD4C2A] md:text-2xl">
            Delivery Address
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Default Address */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="default"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 text-[#FD4C2A] focus:ring-[#FD4C2A] border-gray-300 rounded"
              />
              <label htmlFor="default" className="text-sm text-gray-700 dark:text-white">
                Set as default address
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Home, Office"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FD4C2A] focus:border-[#FD4C2A] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FD4C2A] focus:border-[#FD4C2A] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Select a region --</option>
                <option value="Casablanca-Settat">Casablanca-Settat</option>
                <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
              </select>
            </div>

            {/* Province */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Province</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FD4C2A] focus:border-[#FD4C2A] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Select a province --</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Mohammedia">Mohammedia</option>
              </select>
            </div>

            {/* Commune */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Commune</label>
              <select
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FD4C2A] focus:border-[#FD4C2A] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Select a commune --</option>
                <option value="Sidi Bernoussi">Sidi Bernoussi</option>
                <option value="Hay Hassani">Hay Hassani</option>
              </select>
            </div>

            {/* Street */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Street</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street, building number, etc."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FD4C2A] focus:border-[#FD4C2A] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Coordinates Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="coord"
                checked={showCoordinates}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#FD4C2A] focus:ring-[#FD4C2A] border-gray-300 rounded"
              />
              <label htmlFor="coord" className="text-sm text-gray-700 dark:text-white">
                Add GPS coordinates
              </label>
            </div>

            {/* Show Coordinates Fields */}
            {showCoordinates && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Longitude</label>
                  <input
                    type="text"
                    value={longitude}
                    readOnly
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Latitude</label>
                  <input
                    type="text"
                    value={latitude}
                    readOnly
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white bg-[#FD4C2A] hover:bg-[#e04324] focus:ring-4 focus:outline-none focus:ring-[#fd6e4e] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save address
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddressForm;
