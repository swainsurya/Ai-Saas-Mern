import React from 'react'
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';
import axios from 'axios';
import { LogOutIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {

    const { loggedIn, user, setUser, setLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("/user/logout")
        setUser(null)
        setLoggedIn(false)
        toast.success("Logout Success")
        navigate("/")
    }

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
            <Link to={"/"} className="md:text-2xl text-xl text-blue-600 font-extrabold">AIMAGINIFY</Link>
            <div className="flex items-center space-x-4">
                {loggedIn ? (
                    <>
                        <Link to={"/pricing"} className='text-gray-700 hidden sm:inline font-semibold'>Buy Credits</Link>
                        <span className="text-gray-700 font-semibold">Credits: {user.credits || 0}</span>
                        <Link to={"/dashboard"}>
                            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hidden sm:inline">
                                Generate Images
                            </Button>
                        </Link>
                        <Button onClick={handleLogout}
                            className="bg-red-600 hidden md:block text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </Button>
                        <>
                            <div className="w-10 h-10 bg-blue-700 shadow-sm rounded-full hidden md:flex items-center justify-center text-white cursor-pointer">
                                {user.email[0].toUpperCase()}
                            </div>

                            <Menubar className="md:hidden border-none">
                                <MenubarMenu>
                                    <MenubarTrigger className="w-10 h-10 rounded-full flex items-center justify-center text-white md:hidden bg-blue-700 shadow-sm after:bg-blue-800" >{user.email[0].toUpperCase()}</MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>Credits: {user.credits || 0}</MenubarItem>
                                        <MenubarItem><Link to={"/dashboard"}>Generate Images</Link></MenubarItem>
                                        <MenubarItem><Link to={"/pricing"}>Buy credits</Link></MenubarItem>
                                        <MenubarItem onClick={handleLogout}><LogOutIcon size={24}/>Logout</MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </>
                    </>
                ) : (
                    <>
                        <Link to={"/pricing"}>
                            <span className='font-medium'>Pricing</span>
                        </Link>
                        <Link to={"/login"}>
                            <Button
                                className="bg-blue-600 md:mx-3 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Login
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
