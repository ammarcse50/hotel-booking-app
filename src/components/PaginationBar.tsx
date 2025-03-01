"use client"
import Link from "next/link";
import { JSX, useState } from "react";

interface PaginationBarProps {
    currrentPage: number;
    totalPages: number;
    itemsPerPage: number;

}

export default function PaginationBar({
    currrentPage,
    totalPages
}: PaginationBarProps) {

    const [itemPerPage, setItemPerPage] = useState(0);

    if (totalPages <= 1) return null;
    const pagesTotal = [...Array(totalPages).keys()].map((num) => num + 1);
    const numberPageItems: JSX.Element[] = [];

    if (currrentPage > 1) {
        numberPageItems.push(
            <Link
                href={`?page=${currrentPage - 1}`}
                key="prev"
                className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 mx-2 rounded-md"
            >
                « Prev
            </Link>
        );
    }

    pagesTotal.forEach((page) => {
        numberPageItems.push(
            <Link
                href={`?page=${page}`}
                key={page}
                className={`${currrentPage === page
                    ? "bg-teal-700 text-white px-4 py-2 mx-2 rounded-md cursor-not-allowed"
                    : "text-teal-700 bg-slate-300 hover:bg-teal-100 px-4 py-2 mx-2 rounded-md"
                    }`}
            >
                {page}
            </Link>
        );
    });

    if (currrentPage < totalPages) {
        numberPageItems.push(
            <Link
                href={`?page=${currrentPage + 1}`}
                key="next"
                className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 mx-2 rounded-md"
            >
                Next »
            </Link>
        );
    }

    return (
        <div className="flex justify-center items-center mt-6">
            <div className="flex space-x-2">{numberPageItems}</div>
            <select className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 mx-2 rounded-md" onChange={(e) => setItemPerPage(Number(e.target.value))}>
                <option value="0" disabled>0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </div>
    );
}
