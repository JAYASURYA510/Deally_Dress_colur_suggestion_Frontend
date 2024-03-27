import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import './Suggetion.css';
import ImageCard from './ImageCard';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FcOvertime } from "react-icons/fc";



const Suggetion = () => {
  const dressTypes = ['Kurta', 'Pullover', 'Western'];
  const [randomImages, setRandomImages] = useState({});
  const [blink, setBlink] = useState(false);
  const [data, setData] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.defaults.withCredentials = true;


    const getTokenFromCookie = () => {
      return Cookies.get('token');
  };
    const token = getTokenFromCookie()
    if (!token) {
      navigate('/athuntication')
    }else{
    axios.get('http://localhost:2000/verify')
        .then(res => {
            if (res.data.status) {
                // User is verified, you can proceed with further actions
                console.log('User verified');
            } else {
             
            }
            console.log(res);
        })
        .catch(error => {
            console.error(error);
            navigate('/Notefound');
        });
      }
}, [history]);

  // useEffect(() => {
  //   fetch('http://localhost:2000/suggestion', {
  //     headers: {
  //       'Authorization': 'Bearer your_token_here'
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       return response.json();
  //     })
  //     .then(data => setData(data))
  //     .catch(error => console.error('Error fetching suggestion data:', error));
  // }, []);

  useEffect(() => {
    const fetchRandomImage = async (dressType) => {
      try {
        const response = await fetch(`http://localhost:2000/random-image?dressType=${dressType}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch random image for ${dressType}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.imageUrl) {
          const updatedImage = {
            ...data,
            imageUrl: data.imageUrl.replace('uploads\\', '')
          };
          setRandomImages(prevState => ({
            ...prevState,
            [dressType]: updatedImage
          }));
        } else {
          console.error(`No valid image data received for ${dressType}`);
        }
      } catch (error) {
        console.error(`Error fetching random image for ${dressType}:`, error);
      }
    };

    const fetchAllRandomImages = async () => {
      for (const dressType of dressTypes) {
        await fetchRandomImage(dressType);
      }
    };

    fetchAllRandomImages();

    const interval = setInterval(() => {
      fetchAllRandomImages();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 10000);
    }, 20000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div>
      <div className='cont'>
        <h1>Today's Dress colur suggestion  <FcOvertime /></h1>
        <p>{data}</p>
        <Calendar />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {dressTypes.map((dressType) => (
            <div key={dressType} className={`random-image-card ${blink ? 'blink' : ''}`} style={{ flex: '0 0 300px', margin: '10px' }}>
              {randomImages[dressType] && (
                <ImageCard image={randomImages[dressType]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggetion;
