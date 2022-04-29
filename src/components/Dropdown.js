import React from 'react';

function Dropdown(props) {
  return (
   <div className='dropdown_container'>
      <label>
        {props.label}
        <br />
        <input type='text' name={props.value} list='stops' placeholder='Street or town' onChange={(e) => props.setStop(e.target.value)}/>
          <datalist id='stops'>
            {props.options.map((option) => (
              <option value={option.stop_name}>{option.stop_name}</option>
            ))}
          </datalist>
      </label>
    </div>
  )
}

export default Dropdown