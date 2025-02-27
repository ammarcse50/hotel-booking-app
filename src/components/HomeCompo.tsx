"use client"
import React, { useState } from 'react'
import RoomCard from './RoomCard';
import axios from 'axios';
interface SearchResult {
    id: number;
    name: string;
    capacity: number;
}
const HomeCompo = ({ rooms, images }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    console.log("seletecroom is here", selectedRoom);
    console.log(suggestions);
    const fetchSuggestions = async (query: string) => {
        try {
            setLoading(true);
            const response = await axios.get<SearchResult[]>("/api/search", {
                params: { query },
            });
            setSelectedRoom(response.data)
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setSuggestions([]);
        } else {
            fetchSuggestions(query);
        }
    };

    const handleSuggestionClick = (name: string) => {
        setSearchQuery(name); // Set the selected suggestion in the input field
        setSuggestions([]);



    }
    return (
        <div> <h2 className='text-center mt-20 font-bold text-3xl text-teal-500'>All Rooms </h2>
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3 w-full text-black border rounded-lg mb-4 "
                    placeholder="Search for items or categories..."
                />
                {loading && <p>Loading...</p>}
                {!loading && suggestions.length > 0 && (
                    <ul className="bg-white absolute top-12  text-black shadow-lg rounded-lg p-4">
                        {suggestions.slice(0, 5).map((suggestion) => (
                            <li
                                key={suggestion.id}
                                className="p-2 cursor-pointer hover:bg-indigo-100"
                                onClick={() => handleSuggestionClick(suggestion.name)}
                            >
                                <span className="font-bold">{suggestion.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 2nd section  */}
            {


                selectedRoom && <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4 mt-10">
                    {selectedRoom.map((room) => {
                        const imgPath = images.find((image) => image.split('/').pop() === room.img);
                        return (
                            <div key={room.id} className="relative px-2 h-auto">
                                <RoomCard name={room.name} capacity={room.capacity} img={imgPath} />
                            </div>
                        );
                    })}
                </div>
            }


            {
                selectedRoom.length === 0 &&

                <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4 mt-10">
                    {rooms.map((room) => {
                        const imgPath = images.find((image) => image.split('/').pop() === room.img);
                        return (
                            <div key={room.id} className="relative px-2 h-auto">
                                <RoomCard name={room.name} capacity={room.capacity} img={imgPath} />
                            </div>
                        );
                    })}
                </div>


            }




        </div>
    )
}

export default HomeCompo