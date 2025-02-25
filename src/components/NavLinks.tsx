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
    <div className="flex justify-between ">
      <div className="flex items-center space-x-4">
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
              className={`${pathname === menu.path ? 'active' : ''} flex h-[20px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
              href={menu.path}
            >
              {menu.name}
            </Link>
            {groupedMenus[menu.id] && (
              <div className="absolute left-0 top-4 mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:block hidden">
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


    </div>
  );
};

export default Navbar;
