import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HCard from './HCard'


function Header() {
  const Movies = JSON.parse(localStorage.getItem('movies')) || [];
  const headerMovies = Movies.filter(movie => movie.imageH !== null);

  
  return (
    // display all movies in Movies
    <div className="p-0 md:p-4 lg:p-8 bg-white flex justify-center">
      <Carousel 
      width={1000}
      autoPlay={true}
      centerMode={true}
      interval={10000}
      axis='vertical'
      infiniteLoop={true}
      >
        {headerMovies.map((movie, index) => (
            <HCard image={movie.imageH} title={movie.title}/>
        ))}
      </Carousel>
    </div>
  );
}

export default Header;