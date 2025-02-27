import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MyLazyComponent from './MyLazyComponent'
import Image from 'next/image';

const RoomCard = ({ name, capacity, img }) => {

    console.log("img from roomcard", img);

    return (
        <div>


            <Card>
                <CardHeader>

                 

                    <MyLazyComponent
                        src={img}
                        alt={name}
                        width={400}
                        height={400}
                        blurDataUrl={img}

                    />
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{capacity}</CardDescription>

                </CardHeader>

            </Card>


        </div>
    )
}

export default RoomCard