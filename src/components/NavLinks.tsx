'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { buildMenu } from './build-menu'; // Import the buildMenu function
import { ArrowDown } from 'lucide-react';

const Navbar = ({ menus }: any) => {
  const menuStructure = buildMenu(menus);

  console.log("menuITEMS", menus);


  const renderMenu = (menu: any) => {
    return menu.map((menuItem: any) => {
      const hasChildren = menuItem.children && menuItem.children.length > 0;
      return (
        <div key={menuItem.id}>
          {hasChildren ?
            (
              <NavigationMenu>
                <NavigationMenuList>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger >
                      {menuItem.name} <ArrowDown size={15} className='text-black' />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {renderMenu(menuItem.children)}
                      {/* {menuItem.children?.map((childMenu: any) => (
                        <NavigationMenuItem key={childMenu.id}>
                          <Link href={childMenu.path} passHref>
                            <NavigationMenuLink>{childMenu.name}</NavigationMenuLink>
                          </Link>
                         
                        </NavigationMenuItem>
                      ))} */}
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Link href={menuItem.path} passHref>

                {menuItem.alias || menuItem.name}

              </Link>
            )
          }
        </div>
      );
    });
  };

  return (
    <div className="flex justify-between p-4 text-black">
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

        {renderMenu(menuStructure)}
      </div>
    </div>
  );
};

export default Navbar;
