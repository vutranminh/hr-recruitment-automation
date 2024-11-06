"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

const CVUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (file) formData.append('cv', file);

      const response = await fetch('/api/cv-upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('CV uploaded successfully!');
        setFile(null);
        reset();
      } else {
        alert('Failed to upload CV');
      }
    } catch (error) {
      alert('An error occurred while uploading');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;

    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

    // Check file size (2MB limit)
    if (selectedFile.size > 2 * 1024 * 1024) {
      alert('File must be smaller than 2MB');
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12">
      <h1 className="text-3xl font-bold mb-8">Upload Your CV</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            CV Upload <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX (Max: 2MB)
          </p>
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium
            ${!file || uploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CVUploadPage;