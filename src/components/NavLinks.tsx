'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const Navbar = ({ menus }: any) => {
  const pathname = usePathname();

  const topLevelMenus = menus?.filter((menu: any) => !menu.parent_id);
  const groupedMenus = {};
  menus?.forEach((menu: any) => {
    if (menu.parent_id) {
      if (!groupedMenus[menu.parent_id])
        groupedMenus[menu.parent_id] = [];
      groupedMenus[menu.parent_id].push(menu);
    }
  });

  console.log(groupedMenus);


  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <h1>
          <Image
            src={'/hotel.jpg'}
            className="rounded-full"
            alt="hotel"
            width={40}
            height={30}
            loading="lazy"
          />
        </h1>

        {topLevelMenus?.map((menu: any) => (
          <div key={menu.id} className="relative group">
            <Link
              key={menu.id}
              className={`${pathname === menu.path ? 'active' : ''} font-bold`}
              href={menu.path}
            >
              {menu.name}
            </Link>
            {groupedMenus[menu.id] && (
              <div className="absolute left-0 top-5 mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:block hidden">
                {groupedMenus[menu.id].map((childMenu: any) => (
                  <Link key={childMenu.id} href={childMenu.path} className="block px-4 py-2">
                    {childMenu.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="flex space-x-4">
        {user ? (
          <form action={async()=>{signOut()}}>
            <button className='font-bold' type="submit">Sign Out</button>
          </form>
        ) : (
          <Link
            className={`font-bold ${pathname === '/login' ? 'active' : ''} font-bold`}
            href={'/login'}
          >
            Login
          </Link>
        )}
        <Link
          className={`${pathname === '/signup' ? 'active' : ''}`}
          href={'/signup'}
        >
          SignUp
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
