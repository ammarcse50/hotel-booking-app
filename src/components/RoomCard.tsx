"use client";

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MyLazyComponent from './MyLazyComponent';
import { MapPinned } from 'lucide-react';

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
                        <span className="font-normal text-lg uppercase ">{name}</span>
                    </CardTitle>
                    <CardDescription>
                        <span className="font-normal text-lg uppercase inline-flex"><MapPinned className='mr-2' size={20} color="#c92c2c" />{address}</span>
                    </CardDescription>

                </CardHeader>
            </Card>
        </div>
    );
};

export default RoomCard;