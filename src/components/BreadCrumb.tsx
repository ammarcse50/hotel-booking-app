"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadCrumb({ menus }) {
    const pathname = usePathname();
    const breadcrumbTrail: any = [];


    const getBreadcrumbs = (menus: any, path: any) => {

        console.log("menus", menus);
        console.log("path", path);
        const lastPathPart = path.split("/").pop();

        const findMenu = (slug: string) => {

            for (let menu of menus) {
                if (slug === menu.slug) {
                    breadcrumbTrail.push(menu);
                    if (menu.parent_id) {
                        console.log("menu parent_id", menu.parent_id);

                        const parentMenu = menus.find((parent) => Number(parent.id) === menu.parent_id);

                        if (parentMenu) {
                            console.log("parentmenu", parentMenu);

                            findMenu(parentMenu.slug);
                        }
                    }
                    return;
                }
            }
        };

        findMenu(lastPathPart);
        return breadcrumbTrail.reverse();
    };

    const breadcrumbs = getBreadcrumbs(menus, pathname);
    console.log("check paths", breadcrumbs);

    return (
        <div className="text-teal-400 my-2">
            <nav>
                <ul className="flex space-x-2">
                    {breadcrumbs.map((menu) => (
                        <li key={menu.id}>
                            {
                                  <span>
                                   
                                    <Link href={menu.path}>{menu.breadcrumb_title}</Link> {">"}
                                   </span>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
