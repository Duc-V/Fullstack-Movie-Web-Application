import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Rating } from '@mui/material';

function Movie({ user }) {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thisMovieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    // get all movies
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    // find the current movie data
    const thisMovie = movies.find((movie) => movie.id === id);
    // get all the ratings for this movie
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const thisMovieReviews = reviews.filter((review) => review.movieId === id);

    setMovieReviews(thisMovieReviews);
    setMovie(thisMovie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    handleUpdateMovie();
  }, [thisMovieReviews]);

  const handleRating = (rating) => {
    if (rating === 0) {
      alert('Rating must be at least 1 star');
    } else {
      setRating(rating);
    }
  };

  const handleDeleteComment = (commentId) => {
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = existingReviews.filter(
      (review) => review.commentId !== commentId && review.movieId === id
    );
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setMovieReviews(updatedReviews);
  };

  const handleUpdateMovie = () => {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const updatedMovies = movies.map((movieItem) => {
      if (movieItem.id === id) {
        const totalRating = thisMovieReviews.reduce((sum, review) => sum + review.rating, 0);
        const newRating = thisMovieReviews.length > 0 ? totalRating / thisMovieReviews.length : 0;
        return { ...movieItem, rating: newRating };
      }
      return movieItem;
    });
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Rating must be at least 1 star');
      return;
    }

    if (review.length === 0) {
      alert('Review cannot be empty');
      return;
    }

    // Retrieve existing users from local storage
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // create a new review object
    const date = new Date();
    const newReview = {
      commentId: existingReviews.length + 1,
      userName: user.name,
      movieId: id,
      userId: user.email,
      review: review,
      rating: rating,
      date: date.toDateString(),
    };

    //update reviews
    const updatedReviews = [...existingReviews, newReview];
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    let thisUpdateReviews = updatedReviews.filter((review) => review.movieId === id);

    setMovieReviews(thisUpdateReviews);
    setReview('');
    setRating(0);
  };

  return (
    <div className='bg-white h-screen'>
      {/* movie info section*/}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='bg-white h-screen'>
          <div className='w-full h-2/3 bg-zinc-700 flex justify-center'>
            <div className='flex justify-start items-end md:m-5 rounded-md md:w-3/5 md:h-11/12 bg-slate-800'>
              <div className='flex text-center justify-center items-center md:m-4 text-white'>
                <div>
                  <p className=' bg-yellow-300 md:my-3 rounded-sm text-black font-medium'>now showing</p>
                  <img src={require(`${movie.imageV}`)} alt={movie.title} className='md:w-36 md:h-64 object-cover rounded-md  ' />
                </div>
                <div className='px-3 font-sans'>
                  <p className='text-2xl '>{movie.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* review section*/}

          <div className="w-screen h-2/3 bg-slate-300 flex flex-row justify-center">
            <div className='flex flex-row w-2/3 h-screen md:py-6'>
              {/*  comments display section*/}
              {thisMovieReviews ? <div className='md:mx-10 md:w-full'>
                {[...thisMovieReviews].reverse().map((review, index) => (
                  <div className='md:p-3 rounded-md mb-3 bg-white border-teal-400 border-2 hover:bg-slate-200'>
                    <div className='flex items-center'>
                      <p className='text-2xl font-mono rounded-sm bg-green-600 md:mr-3'>{review.userName}</p>
                      <Rating
                        
                        value={Number(review.rating)}
                      />

                      {user && review.userId === user.email && (
                        <div className='flex justify-end w-full'>
                          <DeleteIcon onClick={() => handleDeleteComment(review.commentId)} />
                        </div>
                      )}
                    </div>
                    <p className='md:py-3'>{review.review}</p>
                    <p className=' text-xs font-mono'>{review.date}</p>
                  </div>
                ))}
              </div> : ''}
              {user ?
                <div class="w-full h-72 bg-white p-4 shadow-md rounded-md">
                  <Rating
                    
                    value={rating}
                    onChange={(event, newValue) => {
                      handleRating(newValue);
                    }}
                  />
                  <div class="mb-4">
                    <label class="block text-gray-700 font-semibold">Your Review:</label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} rows="4" required minLength='1' maxLength="250" class="w-full border border-black resize-none rounded-md px-4 py-2"></textarea>
                  </div>

                  <div class="text-center">
                    <button class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:ring focus:ring-indigo-200"
                      onClick={handleSubmit}
                    >Submit Review</button>
                  </div>
                </div>
                : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Movie;