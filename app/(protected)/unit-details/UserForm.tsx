"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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

interface UserFormProps {
  unitId?: number;
}

export default function UserForm({ unitId }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: session } = useSession();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema), 
    mode: "onBlur",
    defaultValues: {
      fullName: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      message: unitId ? `I am interested in unit #${unitId}` : "",
    }
  });

  // Handle Form Submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would send this to your API
      // Example API call:
      // await apiClient.post('inquiries', {
      //   ...data,
      //   unit_id: unitId,
      //   user_id: session?.user?.id,
      // });
      
      console.log("Form Data Submitted:", {
        ...data,
        unitId,
        userId: session?.user?.id,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Your inquiry has been sent successfully!");
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error sending your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Request More Info</h2>
        
        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">Your inquiry has been submitted successfully. A representative will contact you shortly.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-[#1F4B43] text-white rounded-lg hover:bg-[#1A3F39] transition"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
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
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 h-24"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            {/* Unit Information */}
            {unitId && (
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Unit ID:</span> {unitId}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1F4B43] text-white p-3 rounded-lg font-bold transition disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
