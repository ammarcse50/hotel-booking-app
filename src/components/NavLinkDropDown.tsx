'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildMenu } from './build-menu';

const Navbar = ({ menus }: any) => {
    const menuStructure = buildMenu(menus);

    const renderMenu = (menu: any) => {
        return menu.map((menuItem: any) => {
            const hasChildren = menuItem.children && menuItem.children.length > 0;
            return (
                <div key={menuItem.id} className="">
                    {hasChildren ? (
                        <DropdownMenu>

                            <DropdownMenuTrigger className="text-black hover:text-gray-700 ">
                                {menuItem.name}
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side='bottom'
                                align='start'
                                sideOffset={4}
                                className="w-30 bg-white shadow-lg rounded-md p-2"
                            >
                                {renderMenu(menuItem.children)}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={menuItem.path} passHref>
                            {menuItem.name}
                        </Link>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="flex justify-between p-4 text-black bg-white ">
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
