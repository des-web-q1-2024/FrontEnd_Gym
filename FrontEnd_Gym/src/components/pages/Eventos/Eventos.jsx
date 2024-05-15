import React, { useState, useEffect } from 'react'
import { Desktop } from './screen/Desktop';
import { Mobil } from './screen/Mobil';
export const Eventos = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      {windowWidth < 1095 ? (
        <Mobil />
      ) : (
        <Desktop />
      )}
    </>
  )
}
