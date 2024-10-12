import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            passwordArray = JSON.parse(passwords)
        }


    }, [])
    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: "Bounce"
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        // alert("Show the password");

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {

            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        console.log(form);
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form]);
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition = "Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen
 bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    <span>Pass</span> <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className=' text-green-900 text-center font-semibold'>Your own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full text-black 
                    p-4 py-1' type="text" name="site" id="" />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full text-black 
                    p-4 py-1' type="text" name="username" id="" />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter  password' className='rounded-full border border-green-500 w-full text-black 
                    p-4 py-1' type="password" name="password" id="" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img className='p-1' ref={ref} width={27} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-400 hover:bg-green-500 rounded-full
                    px-6 py-2 w-fit border  border-green-800'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No password to display</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'><a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='flex items-center justify-center'>
                                            {/* <span>{item.site}</span> */}
                                            <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div> </td>

                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.password}</span>
                                            <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
