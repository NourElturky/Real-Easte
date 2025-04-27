"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const testDirectApi = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000';
      
      // Test using FormData
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });
      
      const data = await response.json();
      setResult({
        status: response.status,
        data
      });
      
      if (response.ok) {
        toast.success("API call successful!");
      } else {
        toast.error("API call failed.");
      }
    } catch (error) {
      setResult({ error: String(error) });
      toast.error("Error making API call");
    } finally {
      setLoading(false);
    }
  };
  
  const testNextAuth = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      setResult(data);
      
      if (response.ok && data.status === 200) {
        toast.success("NextAuth test successful!");
      } else {
        toast.error("NextAuth test failed.");
      }
    } catch (error) {
      setResult({ error: String(error) });
      toast.error("Error testing NextAuth");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={testDirectApi}
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-blue-300"
        >
          {loading ? "Testing..." : "Test Direct API"}
        </button>
        
        <button
          onClick={testNextAuth}
          disabled={loading}
          className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-green-300"
        >
          {loading ? "Testing..." : "Test NextAuth"}
        </button>
      </div>
      
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
