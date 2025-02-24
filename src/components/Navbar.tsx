'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = ({ user }) => {
  const pathname = usePathname();
  console.log('pathname', pathname);
  console.log('navbar user', user);

  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <h1>Logo</h1>
        <Link className={`${pathname === '/' ? 'active' : ''}`} href={'/'}>
          Home
        </Link>
        <Link
          className={`${pathname === '/admin' ? 'active' : ''}`}
          href={'/admin'}
        >
          Admin
        </Link>
        <Link
          className={`${pathname === '/admin/schedule' ? 'active' : ''}`}
          href={'/admin/schedule'}
        >
          Schedule
        </Link>
        <Link
          className={`${pathname === '/contact' ? 'active' : ''}`}
          href={'/'}
        >
          Contact
        </Link>
      </div>
      <div className="flex space-x-4">
        {user ? (
          <Link
            className={`${pathname === '/login' ? 'active' : ''}`}
            href={'/login'}
          >
            Login
          </Link>
        ) : (
          <button
          // className={`${pathname === '/login' ? 'active' : ''}`}
          // onClick={async () => await signOut}
          >
            Logout
          </button>
        )}
        <Link
          className={`${pathname === '/signup' ? 'active' : ''}`}
          href={'/signup'}
        >
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
