import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updatePastes } from '../redux/pasteSlice';
import { FaSave, FaClipboardList } from 'react-icons/fa';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    const createPaste = () => {
        const paste = {
            title,
            content: value,
            _id: pasteId || Date.now().toString(36) + Math.random().toString(30).substring(2),
            createdAt: new Date().toISOString(),
        };
        if (pasteId) {
            dispatch(updatePastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    };

    return (
        <div className='bg-black min-h-screen p-4 md:p-10 flex items-center justify-center font-roboto'>
            <div className='bg-gray-800 shadow-2xl rounded-2xl p-4 md:p-8 w-full max-w-4xl lg:max-w-5xl text-white'>
                <header className='flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-8'>
                    <FaClipboardList className='text-sky-500' size={36} />
                    <h1 className='text-3xl sm:text-4xl font-bold text-center sm:text-left'>MemoMagic</h1>
                </header>
                <div className='flex flex-col gap-4 md:gap-6'>
                    <div className='flex flex-col sm:flex-row gap-4 items-center'>
                        <input
                            className='flex-grow p-2 sm:p-4 bg-gray-700 border border-sky-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500'
                            type='text' 
                            placeholder='Enter title here' 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            onClick={createPaste}
                            className='flex items-center gap-2 bg-sky-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-xl hover:bg-sky-700 transition duration-300'
                        >
                            <FaSave size={20} />
                            {pasteId ? "Update Memo" : "Create Memo"}
                        </button>
                    </div>
                    <textarea
                        className='w-full h-64 sm:h-72 md:h-96 bg-gray-700 border border-sky-400 rounded-xl p-2 sm:p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none text-white' 
                        value={value} 
                        placeholder='Enter content here' 
                        onChange={(e) => setValue(e.target.value)} 
                        rows={20}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Home;
