/* Imports */
"use client";
import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

/*functions*/
export default function Zodit() {
    const editor = useRef(null); //declared a null value 
    const [content, setContent] = useState("Worlds best html page"); //declare using state


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
    const handleSubmitZodit = async () => {

        // send html to db

        const response = await fetch('http://localhost:3000/api/zodit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        const data = await response.json();
        console.log(data);

        if (data.status === "success") {
            alert("Data saved successfully");
        }




    }
    return (
        <>
            {/* Below is a basic html page and we use Tailwind css to style*/}
            <Head>
                <meta name='author' content='Soubhagyajit Borah' />
            </Head>
            <main>
                <div className="h-screen w-full flex items-center flex-col">

                    <div className="h-full w-[70vw]">
                        {/* This is the main initialization of the Jodit editor */}
                        <JoditEditor
                            ref={editor}            //This is important
                            value={content}         //This is important
                            config={config}         //Only use when you declare some custom configs
                            onChange={handleChange} //handle the changes
                            className="w-full h-[70%] mt-10 bg-white"
                        />
                        <style>
                            {`.jodit-wysiwyg{height:300px !important}`}
                        </style>
                    </div>
                    <div><button onClick={handleSubmitZodit} className='py-2 px-4 my-2 bg-teal-500 rounded'>Submit</button></div>
                    <div
                        className="my-10 h-full w-[70vw]"
                    >Preview:
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>

                    </div>
                </div>
            </main>
        </>
    );
}
