import React from 'react';

const InputTest = ({handleChange, data}) => (
  <div className="row">
    <h3>Test live collaboration</h3>
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Data to encrypt" aria-label="Recipient's username" aria-describedby="basic-addon2"
      value={data}
      onChange={handleChange}
      >
      </input>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">Put</button>
      </div>
    </div>
  </div>
);

export default InputTest
