"use client"
import { textToHtml } from '@/app/utils/htmlUtils';
import React, { useState, useRef, useMemo, use, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    Dialog,
    DialogContent,

    DialogTitle,

    DialogTrigger,
} from "@/components/ui/dialog"

/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


const CrudZoditBtn = ({ contentZodit }) => {
    const editor = useRef(null); //declared a null value 
    const [content, setContent] = useState(""); //declare using state
    const dialougeTriggerRef = useRef(null);



    // send html to db

    /* The most important point*/
    const config = useMemo( //  Using of useMemo while make custom configuration is strictly recomended 
        () => ({              //  if you don't use it the editor will lose focus every time when you make any change to the editor, even an addition of one character
            /* Custom image uploader button configuretion to accept image and convert it to base64 format */
            uploader: {
                insertImageAsBase64URI: true,
                imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important , use if you only strictly want to allow some specific image format
            },
        }),
        []
    );
    /* function to handle the changes in the editor */
    const handleChange = async (value) => {
        setContent(value);
    };

    const [editId, setEditId] = React.useState(null);
    const [editContent, setEditContent] = React.useState('');


    const handleEdit = async (id) => {
        // Handle edit logic here
        console.log("id from edit", id);
        setEditId(id);
        const itemEdit = contentZodit.find((item) => item.id === id);

        // const convertedToPlain = htmlToText(itemEdit.html)
        // setEditContent(convertedToPlain);
        setContent(itemEdit.html)

    }
    const handleDelete = async (id) => {


        const response = await fetch('http://localhost:3000/api/zodit', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const data = await response.json();

        console.log(data);
        if (data.status === "success") {
            alert("Data deleted successfully");
        }



    }

    const handleSaveEdited = async (id) => {
        // Handle edit logic here


        const convertedToHtml = textToHtml(editContent)
        console.log(convertedToHtml, "it is converted to html");

        const response = await fetch('http://localhost:3000/api/zodit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: editId, content: content }),
        });
        const data = await response.json();

        console.log(data);

        if (data.status === "success") {
            alert("Data saved successfully");
        }

        setEditId(null);
        setEditContent('');

    }
    useEffect(() => {

        if (dialougeTriggerRef.current && editId != null) {
            dialougeTriggerRef.current.click();
        }
    }, [editId]);
    return (
        <div className="overflow-x-auto p-4 z-10">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">Id</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">Content</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {contentZodit.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors ">
                            <td className="py-3 px-4 text-sm text-gray-700">{item.id}</td>
                            <td className="py-3 px-4 mt-20 text-sm text-gray-700 relative">
                                {editId === item.id ? (

                                    <Dialog>

                                        <DialogTitle></DialogTitle>
                                        <DialogTrigger ref={dialougeTriggerRef}>

                                            <div dangerouslySetInnerHTML={{ __html: content }}></div>


                                        </DialogTrigger>

                                        <DialogContent className="">
                                            <div className="">

                                                <div className="h-[70vh] w-[70vh]">
                                                    {/* This is the main initialization of the Jodit editor */}
                                                    <JoditEditor
                                                        ref={editor}            //This is important
                                                        value={content}         //This is important
                                                        config={config}         //Only use when you declare some custom configs
                                                        onChange={handleChange} //handle the changes
                                                        className="w-full h-[50%] mt-10 bg-white"
                                                    />
                                                    <style>
                                                        {`.jodit-wysiwyg{height:300px !important}`}
                                                    </style>
                                                </div>

                                            </div>

                                        </DialogContent>
                                    </Dialog>

                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: item.html }} />
                                )}
                            </td>
                            <td className="py-3 px-4 text-sm">
                                <div className="flex space-x-2">
                                    {editId === item.id ? (<button onClick={() => handleSaveEdited(item.id)} className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition-colors">
                                        save
                                    </button>) : (<button onClick={() => handleEdit(item.id)} className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition-colors">
                                        Edit
                                    </button>)}
                                    <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default CrudZoditBtn