import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MyLazyComponent from './MyLazyComponent'

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
                    <CardTitle><span className='font-bold text-lg capitalize'>Romm Name : {name}</span></CardTitle>
                    <CardDescription><span className='font-bold text-lg capitalize'>Capacity : {capacity}</span> </CardDescription>

                </CardHeader>

            </Card>


        </div>
    )
}

export default RoomCard