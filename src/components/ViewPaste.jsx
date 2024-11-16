import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id)[0];

    return (
        <div className='bg-black min-h-screen p-4 md:p-10 flex flex-col items-center font-roboto'>
            <div className='bg-gray-800 p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl'>
                <div className='flex justify-between items-center mb-4'>
                    <div className='text-lg md:text-xl lg:text-2xl font-bold text-sky-500'>{paste.title}</div>
                </div>
                <div className='mt-4 md:mt-8'>
                    <textarea
                        className='rounded-2xl bg-gray-900 text-white p-2 md:p-4 w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] whitespace-pre-wrap overflow-auto focus:outline-none'
                        value={paste.content}
                        placeholder='Enter content here'
                        rows={20}
                        disabled
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default ViewPaste;
