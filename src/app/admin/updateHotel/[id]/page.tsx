import UpdateHotel from '@/components/UpdateHotel'
import React from 'react'

export default async function UpdateHotelPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params;
    return (
        <div>

            <UpdateHotel id={id} />
        </div>
    )
}
