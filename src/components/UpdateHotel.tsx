'use client';

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { exo2 } from './Font_exo2';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';
const UpdateHotel = ({ id }) => {
    const [file, setFile] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState([]);
    const [companyImages, setCompanyImages] = useState([]);
    const [hotels, setHotels] = useState([]);




    const onChange = (changeEvent: any) => {
        for (const file of changeEvent.target.files) {
            setTimeout(() => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => { setCompanyImages([...companyImages, reader.result]) }
                reader.onerror = () => { console.log(reader.error) }
            }, 1000)

        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const getAllUnits = async () => {
        try {
            await fetch(`/api/mydb/getAllUnits`)
                .then(res => res.json())
                .then(data => {
                   
                    setSelectedUnit(data);

                })
            await fetch(`/api/mydb/getSingleHotel/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setHotels(data)
                })

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllUnits();
    }, []);



    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const alias = form.alias.value;
        const unit_id = form.unit_id.value;
        const parent_id = form.parent_id.value;
        const language_id_default_choice = form.language_id_default_choice.value;
        const time_zone_list_id = form.time_zone_list_id.value;
        const currency_list_id = form.currency_list_id.value;
        const details = form.details.value;
        const address = form.address.value;
        const is_super_system_company = form.is_super_system_company.value;
        const application_domain = form.application_domain.value;
        const company_website_url = form.company_website_url.value;
        const company_logo = form.company_logo.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const created_at = form.created_at.value;
        const created_by = form.created_by.value;
        const updated_at = form.updated_at.value;
        const updated_by = form.updated_by.value;
        const is_active = form.is_active.value;
        const is_default_portal_selection = form.is_default_portal_selection.value;
        const is_email_notification = form.is_email_notification.value;
        const is_sms_notification = form.is_sms_notification.value;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('alias', alias);
        formData.append('unit_id', unit_id);
        formData.append('parent_id', parent_id);
        formData.append('language_id_default_choice', language_id_default_choice);
        formData.append('time_zone_list_id', time_zone_list_id);
        formData.append('currency_list_id', currency_list_id);
        formData.append('details', details);
        formData.append('address', address);
        formData.append('is_super_system_company', is_super_system_company);
        formData.append('application_domain', application_domain);
        formData.append('company_website_url', company_website_url);
        formData.append('company_logo', company_logo);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('created_at', created_at);
        formData.append('created_by', created_by);
        formData.append('updated_at', updated_at);
        formData.append('updated_by', updated_by);
        formData.append('is_active', is_active);
        formData.append('is_default_portal_selection', is_default_portal_selection);
        formData.append('is_email_notification', is_email_notification);
        formData.append('is_sms_notification', is_sms_notification);
        formData.append('file', file);
        companyImages.forEach((image) => {
            formData.append('company_images', image);
        });

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        try {
            const response = await fetch('/api/mydb/updateHotel', {
                method: 'PUT',
                body: formData,
            });
            if (response.status === 200) {
                alert('Data uploaded successfully');
                form.reset();
                setFile(null);
                setCompanyImages([]);

            } else {
                alert('Failed to upload data');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className='flex w-full gap-5'> <Input type="text" defaultValue={hotels.name} name="name" placeholder="Hotel Name" className='m-3' required />
                    <Input type="text" defaultValue={hotels.alias} name="alias" placeholder="Alias" className='m-3' required />
                    {/* <Input type="number" name="unit_id" placeholder="Unit_Id" className='m-3' required /> */}

                    <Select name="unit_id">
                        <SelectTrigger className="w-full m-3">
                            <SelectValue placeholder="Select a Unit" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectGroup >
                                {
                                    selectedUnit?.map((unit) => (
                                        <SelectItem key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </SelectItem>
                                    ))
                                }

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input type="number" defaultValue={hotels.parent_id} name="parent_id" placeholder="Parent_Id" className='m-3' />
                    <Input type="number" defaultValue={hotels.language_id_default_choice} name="language_id_default_choice" placeholder="Language ID Default Choice" className='m-3' />
                </div>

                <div className='flex w-full gap-5'>
                    <Input type="number" defaultValue={hotels.time_zone_list_id} name="time_zone_list_id" placeholder="Time Zone List ID" className='m-3' required />
                    <Input type="number" defaultValue={hotels.currency_list_id} name="currency_list_id" placeholder="Currency List ID" className='m-3' required />
                    <Input type="text" defaultValue={hotels.details} name="details" placeholder="Details" className='m-3' />
                    <Input type="text" defaultValue={hotels.address} name="address" placeholder="Address" className='m-3' />

                    <Input type="number" defaultValue={hotels.is_super_system_company} name="is_super_system_company" placeholder="Is Super System Company" className='m-3' />
                </div><div className='flex w-full gap-5'>
                    <Input type="text" defaultValue={hotels.application_domain} name="application_domain" placeholder="Application Domain" className='m-3' />
                    <Input type="text" defaultValue={hotels.company_website_url} name="company_website_url" placeholder="Company Website URL" className='m-3' />
                </div>
                <div className='flex w-full gap-5'>
                    <Input type="text" name="company_logo" placeholder="Company Logo" className='m-3 hidden' />
                    <Input type="text" defaultValue={hotels.phone} name="phone" placeholder="Phone Number" className='m-3' required />
                    <Input type="email" name="email" defaultValue={hotels.email} placeholder="Email" className='m-3' required />
                    <Input type="datetime-local" defaultValue={hotels.created_at} name="created_at" placeholder="Created At" className='m-3 hidden' />
                </div>
                <div className='flex w-full gap-5 mb-10'>
                    <Input type="number" defaultValue={hotels.created_by} name="created_by" placeholder="Created By" className='m-3' />
                    <Input type="datetime-local" defaultValue={hotels.updated_at} name="updated_at" placeholder="Updated At" className='m-3 hidden' />
                    <Input type="number" name="updated_by" defaultValue={hotels.updated_by} placeholder="Updated By" className='m-3' />
                    <Input type="number" name="is_active" defaultValue={hotels.is_active} placeholder="Is Active" className='m-3' />
                    <Input type="number" name="is_default_portal_selection" defaultValue={hotels.is_default_portal_selection} placeholder="Is Default Portal Selection" className='m-3' />

                    <Input type="number" name="is_email_notification" defaultValue={hotels.is_email_notification} placeholder="Is Email Notification" className='m-3' />
                    <Input type="number" name="is_sms_notification" defaultValue={hotels.is_sms_notification} placeholder="Is SMS Notification" className='m-3' />
                </div>
                <div className='flex w-full gap-5 mb-10'>
                    <div>
                        <label className='m-3'>
                            <span className='border-2 border-teal-500 p-2'>Company Logo</span>
                            <input type="file" name="file" onChange={handleFileChange} className="px-2" required />
                        </label>
                        <div className='m-3 flex gap-2'>
                            {file &&
                                <Image alt='img' loading='lazy' width={30} height={30} src={URL.createObjectURL(file)} />}

                        </div>
                    </div>
                    <div>
                        <label className='m-3'>
                            <span className='border-2 border-teal-500 p-2'>Company Additional Images</span>
                            <input type="file" defaultValue={hotels.company_logo} name="file" onChange={onChange} className="px-2" required />
                        </label>
                        <div className='m-3 flex gap-2'>
                            {companyImages.map((link) => (
                                <Image key={link} alt='img' loading='lazy' width={30} height={30} src={link} />
                            ))}

                        </div>
                    </div>
                </div>
                <div className='flex w-full '>
                    <button type="submit" className={`px-4 py-2 bg-teal-500 rounded ${exo2.className} w-1/2 mx-auto`}>
                        Update
                    </button>
                </div>
            </form >
        </>
    );
};

export default UpdateHotel;