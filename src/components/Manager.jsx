import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast.success('Copied!', {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/hide.png")) {
            ref.current.src = "icons/show.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/hide.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
        await fetch("http://localhost:3000/", {method: "DELETE", headers: {"content-Type":"application/json"}, body: JSON.stringify({id: form.id})})

        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        await fetch("http://localhost:3000/", {method: "POST", headers: {"content-Type":"application/json"}, body: JSON.stringify({ ...form, id: uuidv4()})})
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast.success('Password Saved Successfully!', {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
        else{
            toast.error('Password not saved!', {
                position: "bottom-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = async(id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"content-Type":"application/json"}, body: JSON.stringify({id})})
        }
        toast.success('Password Deleted!', {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            >
            </ToastContainer>

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className=" p-2 md:p-0 md:mycontainer min-h-[83.1vh]">
                <h1 className=' text-white text-3xl text-center'> <span className="text-slate-50">&lt;</span>
                    Vault
                    <span className='text-green-500'>PRO</span>
                    /
                    <span className="text-slate-50">&gt;</span>
                </h1>
                <p className=' text-slate-50 text-lg text-center'>Your own
                    <span className='text-green-500'>
                        &nbsp;PASSWORD MANAGER
                    </span>
                </p>

                <div className="text-white flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-black w-full text-slate-50 bg-slate-950 px-4' type="text" name='site' id="site"/>
                    <div className=" md:flex-row flex-col flex w-full justify-between gap-8">

                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-black w-full text-slate-50 bg-slate-950 px-4' type="text" name='username' id="username"/>
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-black w-full text-slate-50 bg-slate-950 px-4' type="password" name='password' id="password"/>
                            <span className='absolute right-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/show.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center rounded-full bg-slate-950 w-fit px-4 py-1 hover:bg-violet-950 hover:font-bold text-sm'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords text-white items-center">
                    <h2 className='font-bold py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>You have no passwords to show</div>}
                    {passwordArray.length != 0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        Website
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 py-1">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    <th scope="col" className="px-6 py-1">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    passwordArray.map((item, index) => {
                                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                            <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex">
                                                <div className='flex gap-2'>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <img className='w-4 invert cursor-pointer' src="icons/copy.png" alt="copy" onClick={() => { copyText(item.site) }} />
                                                </div>
                                            </th>
                                            <td className="px-4 py-4">
                                                <div className='flex gap-2'>
                                                    {item.username}
                                                    <img className='w-4 invert cursor-pointer' src="icons/copy.png" alt="copy" onClick={() => { copyText(item.username) }} />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 ">
                                                <div className='flex gap-2'>
                                                    {"*".repeat(item.password.length)}
                                                    <img className='w-4 invert cursor-pointer' src="icons/copy.png" alt="copy" onClick={() => { copyText(item.password) }} />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <a href="#" onClick={() => { editPassword(item.id) }} className="flex gap-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Edit
                                                </a>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <a href="#" onClick={() => { deletePassword(item.id) }} className="flex gap-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    }
                </div>

            </div>
        </>
    )
}

export default Manager
