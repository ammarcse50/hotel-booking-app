"use client";
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MyLazyComponent from './MyLazyComponent';
import { MapPinned, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
const replacer = (key: string, value: any) => {
    if (typeof value === "bigint") {
        return value.toString();
    }
    return value;
};
const RoomCardAdmin = ({ id, name, address, img }) => {
    const Router = useRouter();
    const handleDelete = async () => {
        try {
            const response = await fetch('/api/mydb/deleteHotel', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imgUrl: img, companyId: id }, replacer),
            });

            if (response.ok) {
                alert('Image and company data deleted successfully');
                Router.push("/admin");

            } else {
                console.error('Failed to delete image and company data');
                alert('Failed to delete image and company data');
            }
        } catch (error) {
            console.error('Error deleting image and company data:', error);
        }
    };
    const handleEdit = async () => {
        console.log("edit");
        Router.push("/admin/updateHotel/" + id);
    }
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
                        <span className="font-semibold text-lg uppercase">{name}</span>
                    </CardTitle>
                    <CardDescription>
                        <span className="font-normal text-lg uppercase inline-flex"><MapPinned className='mx-2' color="#c92c2c" />{address}</span>
                    </CardDescription>
                    <button
                        onClick={handleDelete}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button onClick={handleEdit} className='absolute top-2 left-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600' >  <Pencil className="w-5 h-5" /></button>
                </CardHeader>
            </Card>
        </div>
    );
};

export default RoomCardAdmin;