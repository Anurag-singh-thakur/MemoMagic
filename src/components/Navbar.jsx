import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-center h-10 gap-20 text-xl border-b-2 border-b-black font-serif text-blue-800 bg-slate-800' >
      <NavLink  className='' to="/">
        Home
      </NavLink>
      <NavLink to="/pastes">
        Memos 
      </NavLink>
    </div>
  )
}

export default Navbar