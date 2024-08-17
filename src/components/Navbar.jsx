import React from 'react'

const Navbar = () => {
    return (
        <nav className=" bg-slate-950 ">
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-slate-50 text-2xl">
                    <span className="text-slate-50">&lt;</span>
                    Vault
                    <span className='text-green-500'>PRO</span>
                    /
                    <span className="text-slate-50">&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold hover:text-green-500 text-slate-50' href="/">Home</a>
                        <a className='hover:font-bold hover:text-green-500 text-slate-50' href="#">About</a>
                        <a className='hover:font-bold hover:text-green-500 text-slate-50' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='flex rounded-full justify-center items-center' >
                    <img className='py-2 w-8' src="icons/github-mark-white.svg" alt="" />
                    <img className='invert w-20 py-2' src="icons/GitHub_Logo.png" alt="GitHub" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
