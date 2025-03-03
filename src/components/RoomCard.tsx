"use client";

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MyLazyComponent from './MyLazyComponent';
import { Trash2 } from 'lucide-react';

const replacer = (key: string, value: any) => {
    if (typeof value === "bigint") {
        return value.toString();
    }
    return value;
};

const RoomCard = ({ id, name, address, img }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch('/api/actions/deleteImg', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imgUrl: img, companyId: id }, replacer),
            });

            if (response.ok) {
                alert('Image and company data deleted successfully');
             
            } else {
                console.error('Failed to delete image and company data');
            }
        } catch (error) {
            console.error('Error deleting image and company data:', error);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    {img && (
                        <MyLazyComponent
                            src={img}
                            alt={name}
                            width={400}
                            height={400}
                            blurDataUrl={img}
                        />
                    )}
                    <CardTitle>
                        <span className="font-bold text-lg capitalize">Room Name: {name}</span>
                    </CardTitle>
                    <CardDescription>
                        <span className="font-bold text-lg capitalize">Address: {address}</span>
                    </CardDescription>
                    <button
                        onClick={handleDelete}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </CardHeader>
            </Card>
        </div>
    );
};

export default RoomCard;