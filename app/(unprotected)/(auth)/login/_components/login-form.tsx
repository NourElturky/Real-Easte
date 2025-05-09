"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { authService } from "@/lib/api";
import { toast } from "sonner";

export const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const signUpValidationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: isSignUp ? signUpValidationSchema : loginValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (isSignUp) {
          // Handle registration
          await authService.register({
            first_name: values.firstName,
            last_name: values.lastName,
            phone_number: values.phone,
            email: values.email,
            password: values.password,
            password_confirmation: values.password,
          });
          
          toast.success("Registration successful! Please login.");
          setIsSignUp(false); // Switch to login form
        } else {
          // Handle login using NextAuth
          console.log("Starting login with:", values.email);
          
          // Test for common login issues
          console.log("Environment check:", {
            apiUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
            nextAuthUrl: process.env.NEXTAUTH_URL,
          });
          
          const signinResponse = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          
          console.log("NextAuth response:", signinResponse);
          
          if (signinResponse?.error) {
            toast.error(`Login failed: ${signinResponse.error}`);
            console.error("NextAuth error:", signinResponse.error);
            return;
          }
          
          // Try to get the session
          const session = await getSession();
          console.log("Session after signin:", session);
          
          if (!session?.user) {
            toast.error("Session could not be established. Please try again.");
            return;
          }
          
          toast.success("Login successful!");
          router.push("/");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error(error instanceof Error ? error.message : "Authentication failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-[800px] h-[500px] overflow-hidden bg-white rounded-lg shadow-lg">
        <div
          className={`absolute top-0 h-full w-1/2 bg-[#1F4B43] text-white flex items-center justify-center transition-transform duration-500 ${
            isSignUp ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h1>
            <p className="mb-6 text-sm">
              {isSignUp
                ? "Sign in to access your account and explore features."
                : "Register with your personal details to use all of the site features."}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="px-6 py-2 border border-white rounded hover:bg-white hover:text-[#1F4B43] transition"
              disabled={isLoading}
            >
              {isSignUp ? "Login" : "SIGN UP"}
            </button>
          </div>
        </div>

        {/* Form Section (Login/SignUp) */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-white p-8 transition-transform duration-500 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          } right-0`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {isSignUp && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
            )}

            {/* Checkbox and Forgot Password for Login */}
            {!isSignUp && (
              <div className="flex justify-between mb-6">
                <label className="text-gray-500">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <a href="#" className="text-[#1F4B43] hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#1F4B43] text-white py-2 rounded hover:bg-[#155E52] transition"
              disabled={isLoading}
            >
              {isLoading 
                ? "Please wait..." 
                : isSignUp ? "SIGN UP" : "SIGN IN"}
            </button>
            
            <div className="mt-2 text-center text-sm text-gray-600">
              {isLoading && "Processing your request..."}
            </div>
          </form>

          <div className="flex justify-center my-6 space-x-4"></div>
          <p className="text-gray-500 text-center">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span
              onClick={() => !isLoading && setIsSignUp(!isSignUp)}
              className={`text-[#1F4B43] hover:underline cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
