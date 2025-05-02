import React from "react";
import "./AddressFormCheck.css";

const AddressForm = ({ formData, handleChange, regions, provinces, communes }) => {
  return (
    <form>
      {/* Title and Street */}
      <div className="input-group">
        <label className="addressInfo" htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Home, Office"
          required
        />
      </div>

      <div className="input-group">
        <label className="addressInfo" htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street, building number, etc."
          required
        />
      </div>

      {/* Region, Province, Commune */}
      <div className="center-container">
        <div className="input-group">
          <label className="addressInfo" htmlFor="region">Region</label>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option value="">Select Region</option>
            {regions.map(r => (
              <option key={r.id} value={r.id}>{r.regionName}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="addressInfo" htmlFor="province">Province</label>
          <select name="province" value={formData.province} onChange={handleChange}>
            <option value="">Select Province</option>
            {provinces.map(p => (
              <option key={p.id} value={p.id}>{p.provinceName}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="addressInfo" htmlFor="commune">Commune</label>
          <select name="commune" value={formData.commune} onChange={handleChange}>
            <option value="">Select Commune</option>
            {communes.map(c => (
              <option key={c.id} value={c.id}>{c.communeName}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
