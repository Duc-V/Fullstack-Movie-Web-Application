import React from 'react'
import VCard from './VCard'

function Main () {
    const Movies = JSON.parse(localStorage.getItem('movies')) || [];
    const sortedMovies = [...Movies].sort((a,b) => b.rating - a.rating);

    return (
    // interate through each movie and display them as vertical cards
    <div className='w-full bg-slate-800 md:p-8 flex justify-center items-center '>
        <div className='md:w-4/5 w-11/12 lg:w-9/12 flex flex-wrap justify-center items-center '>
            {sortedMovies.map((movie,index) =>(
                <VCard key={movie.id} mv={movie}/>
            ))}
        </div>
    </div>
  );
}

export default Main;