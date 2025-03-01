import React from 'react'
import NavLinkDropDown from './NavLinkDropDown'
import { signOut } from '../../auth';
import Link from 'next/link';
const Navbar = ({ user, menus }) => {
    //  console.log("user of navbar", user.user.email);
    const authUser = user?.user?.email;
    return (
        <div className='flex justify-between items-center'>

            <NavLinkDropDown menus={menus} />


            <div className='flex'>
                {authUser ? <form
                    action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/' });
                    }}
                >
                    <button className="flex h-[20px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">

                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form> : <Link className="flex h-[20px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" href={"/login"}>Sign in</Link>}

                <Link href={"/signup"} className="flex h-[20px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Sign Up</Link>


            </div>
        </div>
    )
}

export default Navbar