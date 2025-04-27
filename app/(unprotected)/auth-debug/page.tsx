"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { authService } from "@/lib/api";

export default function AuthDebugPage() {
  const { data: session, status } = useSession();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [directApiResponse, setDirectApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    // Fetch session data when component mounts
    const fetchSession = async () => {
      const session = await getSession();
      setSessionData(session);
    };
    fetchSession();
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const testDirectApi = async () => {
    setIsLoading(true);
    try {
      const response = await authService.directLogin(
        credentials.email,
        credentials.password
      );
      setDirectApiResponse(response);
    } catch (error) {
      setDirectApiResponse({ error: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const testNextAuth = async () => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      // Refresh session data
      const newSession = await getSession();
      setSessionData(newSession);
    } catch (error) {
      console.error("NextAuth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Authentication Debug Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Test Authentication</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={testDirectApi}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Test Direct API
            </button>
            <button
              onClick={testNextAuth}
              disabled={isLoading}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Test NextAuth
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Current Session</h2>
          <p className="mb-2">Status: {status}</p>
          
          {session && (
            <div className="mb-4">
              <p>User: {session.user?.name || "No name"}</p>
              <p>Email: {session.user?.email || "No email"}</p>
            </div>
          )}

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={!session}
          >
            Sign Out
          </button>
          
          <h3 className="text-lg font-semibold mt-6 mb-2">Raw Session Data:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(sessionData, null, 2)}
          </pre>
        </div>
      </div>

      {directApiResponse && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Direct API Response</h2>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-80">
            {JSON.stringify(directApiResponse, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
        <p>NEXT_PUBLIC_BASE_API_URL: {process.env.NEXT_PUBLIC_BASE_API_URL || "Not set"}</p>
        <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || "Not set"}</p>
      </div>
    </div>
  );
}
