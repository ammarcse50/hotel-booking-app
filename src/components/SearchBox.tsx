"use client";
import axios from "axios";
import React, { useState } from "react";
interface SearchResult {
    id: number;
    name: string;
    category: string;
}

export default function SearchBox() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    console.log(suggestions);
    const fetchSuggestions = async (query: string) => {
        try {
            setLoading(true);
            const response = await axios.get<SearchResult[]>("/api/search", {
                params: { query },
            });
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
        setSuggestions([]); // Clear the suggestions list
    };
    return (
        <div className="">
            {/* Input Field */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-3 w-full border rounded-lg mb-4 "
                placeholder="Search for items or categories..."
            />
            {/* Suggestions */}
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
    );
}
