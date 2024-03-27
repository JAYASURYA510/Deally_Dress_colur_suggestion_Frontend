import React from 'react';
import './Suggetion.css';



const NoteFound = () => {
    return (
        <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
            <div className="not-found">
      <h1>401 - Page Not Found</h1>
      <p>Oops! Looks like you're lost...</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-fishing-cat"
      >
        {/* Replace this path with the SVG path for the fishing cat image */}
        <path d="M12 9v2m0 4v.01"></path>
      </svg>
    </div>
        </div>
    );
};

export default NoteFound;