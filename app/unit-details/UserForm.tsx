"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define Form Data Interface
interface FormData {
  fullName: string;
  email?: string;
  phone: string;
  message?: string;
}

// Define Validation Schema with Explicit Type
const validationSchema: yup.ObjectSchema<FormData> = yup.object({
  fullName: yup.string().required("Full Name is required"),
  phone: yup
    .string()
    .required("Phone number is required"),
  email: yup.string().email("Invalid email format").optional(),
  message: yup.string().optional(),
}).required(); 

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema), 
    mode: "onBlur", 
  });

  // Handle Form Submission
  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center py-8 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Request More Info</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="fullName"
              placeholder="Full Name"
              {...register("fullName")}
              className="w-full mt-1"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className="w-full mt-1"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              {...register("phone")}
              className="w-full mt-1"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Message"
              {...register("message")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2h-24"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1F4B43] text-white p-3 rounded-lg font-bold transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
