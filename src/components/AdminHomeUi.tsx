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
} from "@/components/ui/select";
import Image from 'next/image';

const AdminHomeUi = () => {
  const [file, setFile] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState([]);
  const [companyImages, setCompanyImages] = useState([]);

  console.log("company Images", companyImages);



  const handleMultiFileChange = (e: any) => {
    const files = e.target.files;

    setCompanyImages([...companyImages, ...files]);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };


  const getAllUnits = async () => {
    try {
      const response = await fetch('/api/mydb/getAllUnits');
      const data = await response.json();
      setSelectedUnit(data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  useEffect(() => {
    getAllUnits();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('alias', form.alias.value);
    formData.append('unit_id', form.unit_id.value);
    formData.append('parent_id', form.parent_id.value);
    formData.append('language_id_default_choice', form.language_id_default_choice.value);
    formData.append('time_zone_list_id', form.time_zone_list_id.value);
    formData.append('currency_list_id', form.currency_list_id.value);
    formData.append('details', form.details.value);
    formData.append('address', form.address.value);
    formData.append('is_super_system_company', form.is_super_system_company.value);
    formData.append('application_domain', form.application_domain.value);
    formData.append('company_website_url', form.company_website_url.value);
    formData.append('phone', form.phone.value);
    formData.append('email', form.email.value);
    formData.append('created_at', form.created_at.value);
    formData.append('created_by', form.created_by.value);
    formData.append('updated_at', form.updated_at.value);
    formData.append('updated_by', form.updated_by.value);
    formData.append('is_active', form.is_active.value);
    formData.append('is_default_portal_selection', form.is_default_portal_selection.value);
    formData.append('is_email_notification', form.is_email_notification.value);
    formData.append('is_sms_notification', form.is_sms_notification.value);
    if (file) {
      formData.append('file', file);
    }
    companyImages.forEach((image, index) => {
      formData.append(`company_images`, image);
    });
    try {
      const response = await fetch('/api/mydb/addHotel', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
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
    <form onSubmit={handleOnSubmit}>
      <div className='flex w-full gap-5'>
        <Input type="text" name="name" placeholder="Hotel Name" className='m-3' required />
        <Input type="text" name="alias" placeholder="Alias" className='m-3' required />
        <Select name="unit_id">
          <SelectTrigger className="w-full m-3">
            <SelectValue placeholder="Select a Unit" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectGroup>
              {selectedUnit.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input type="number" name="parent_id" placeholder="Parent_Id" className='m-3' />
        <Input type="number" name="language_id_default_choice" placeholder="Language ID Default Choice" className='m-3' />
      </div>

      <div className='flex w-full gap-5'>
        <Input type="number" name="time_zone_list_id" placeholder="Time Zone List ID" className='m-3' required />
        <Input type="number" name="currency_list_id" placeholder="Currency List ID" className='m-3' required />
        <Input type="text" name="details" placeholder="Details" className='m-3' />
        <Input type="text" name="address" placeholder="Address" className='m-3' />
        <Input type="number" name="is_super_system_company" placeholder="Is Super System Company" className='m-3' />
      </div>

      <div className='flex w-full gap-5'>
        <Input type="text" name="application_domain" placeholder="Application Domain" className='m-3' />
        <Input type="text" name="company_website_url" placeholder="Company Website URL" className='m-3' />
      </div>

      <div className='flex w-full gap-5'>
        <Input type="text" name="company_logo" placeholder="Company Logo" className='m-3 hidden' />
        <Input type="text" name="phone" placeholder="Phone Number" className='m-3' required />
        <Input type="email" name="email" placeholder="Email" className='m-3' required />
        <Input type="datetime-local" name="created_at" placeholder="Created At" className='m-3 hidden' />
      </div>

      <div className='flex w-full gap-5 mb-10'>
        <Input type="number" name="created_by" placeholder="Created By" className='m-3' />
        <Input type="datetime-local" name="updated_at" placeholder="Updated At" className='m-3 hidden' />
        <Input type="number" name="updated_by" placeholder="Updated By" className='m-3' />
        <Input type="number" name="is_active" placeholder="Is Active" className='m-3' />
        <Input type="number" name="is_default_portal_selection" placeholder="Is Default Portal Selection" className='m-3' />
        <Input type="number" name="is_email_notification" placeholder="Is Email Notification" className='m-3' />
        <Input type="number" name="is_sms_notification" placeholder="Is SMS Notification" className='m-3' />
      </div>

      <div className='flex w-full gap-5 mb-10'>
        <div>
          <label className='m-3'>
            <span className='border-2 border-teal-500 p-2'>Company Logo</span>
            <input type="file" name="file" onChange={handleFileChange} className="px-2" required />
          </label>
          <div className='m-3 flex gap-2'>
            {file && <Image alt='img' loading='lazy' width={30} height={30} src={URL.createObjectURL(file)} />}
          </div>
        </div>

        <div>
          <label className='m-3'>
            <span className='border-2 border-teal-500 p-2'>Company Additional Images</span>
            <input type="file" name="company_images" onChange={handleMultiFileChange} className="px-2" multiple required />
          </label>
          <div className='m-3 flex gap-2'>
            {companyImages.map((link, index) => (
              <Image key={index} alt='img' loading='lazy' width={30} height={30} src={link} />
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full'>
        <button type="submit" className={`px-4 py-2 bg-teal-500 rounded ${exo2.className} w-1/2 mx-auto`}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdminHomeUi;