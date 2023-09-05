import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
function VCard({ mv })  {
    console.log(mv.rating);
    return (
        <Link to={`/movie/${mv.id}`}>
        <div className='relative text-white m-4 md:m-8'>
        <div className='hover:-translate-y-5 hover:drop-shadow-md transition-transform duration-300 '>
            <img src={require(`${mv.imageV}`)} alt={mv.title} className='w-32 h-52 md:w-250px md:h-400px object-cover rounded-md  '/>
            {/* time table for each movie */}
            <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-32 h-52 md:w-250px md:h-400px transition-opacity delay-1000 opacity-0 hover:opacity-70 duration-500 rounded-md bg-black '>
            <table className=''>
                <tbody>
                    <tr>
                    {mv.timeTable.map((item, index) => (
                        <th key={index} className='md:px-3 font-mono '>{item.date}</th>
                    ))}
                    </tr>
                <tr class>
                    {mv.timeTable.map((item, index) => (
                        <td key={index} className='text-center font-mono '>
                            {item.time.map((time, index) => (
                                <div key={index} className='md:py-1'>
                                {time}
                                </div>
                            ))}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            </div> 
        </div>
        <p className='font-medium font-sans pt-2 z-1'>{mv.title}</p>
        <Rating
            precision={0.5}
            value={mv.rating}
        />
    </div>
    </Link>
    );
  }

export default VCard;