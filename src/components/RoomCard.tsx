"use client";

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MyLazyComponent from './MyLazyComponent';

const RoomCard = ({ name, address, img }) => {


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

                </CardHeader>
            </Card>
        </div>
    );
};

export default RoomCard;