import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { RxShare2 } from "react-icons/rx";

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(paste =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    
    }

    function handleShare(pasteId) {
        const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
        navigator.clipboard.writeText(shareableLink).then(() => {
            toast.success("Shareable link copied to clipboard");
        });
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    }

    return (
        <div className='bg-black min-h-screen p-4 md:p-10 flex flex-col items-center font-poppins'>
            <input
                className='p-2 sm:p-3 rounded-full min-w-[200px] sm:min-w-[300px] mt-5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-300'
                type="search"
                placeholder='Search here...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-5 mt-6 w-full max-w-md md:max-w-4xl lg:max-w-6xl'>
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div className='bg-gray-800 p-4 rounded-xl md:rounded-2xl shadow-lg relative text-white' key={paste._id}>
                            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 md:gap-0'>
                                <div className='text-lg md:text-xl font-semibold text-sky-600'>{paste.title}</div>
                                <div className='flex gap-2'>
                                    <Link to={`/?pasteId=${paste._id}`}>
                                        <CiEdit className='text-sky-500 hover:text-sky-400' size={20} />
                                    </Link>
                                    <Link to={`/pastes/${paste._id}`}>
                                        <BsEye className='text-green-500 hover:text-green-400' size={20} />
                                    </Link>
                                    <button onClick={() => handleDelete(paste._id)}>
                                        <AiOutlineDelete className='text-red-500 hover:text-red-400' size={20} />
                                    </button>
                                    <button onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("Copied to clipboard") }}>
                                        <MdContentCopy className='text-yellow-500 hover:text-yellow-400' size={20} />
                                    </button>
                                    <button onClick={() => handleShare(paste._id)}>
                                        <RxShare2 className='text-indigo-500 hover:text-indigo-400' size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className='max-h-32 overflow-y-auto scrollbar-hide'>
                                <pre className='bg-gray-900 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap mb-4'>{paste.content}</pre>
                            </div>
                            <div className='text-sm text-gray-400 mt-2'>Created at: {formatDate(paste.createdAt)}</div>
                        </div>
                    ))
                ) : (
                    <div className='text-white text-2xl'>No Data Found</div>
                )}
            </div>
        </div>
    );
};

export default Paste;
