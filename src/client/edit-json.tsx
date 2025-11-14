"use client";

import { useOpsBot } from "@/context/json-context";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const OpsBotJsonEditor = () => {
  const { data, setData } = useOpsBot();
  const [localData, setLocalData] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalData(e.target.value);
    setError(null);
  };

  const saveChanges = () => {
    try {
      const parsed = JSON.parse(localData);
      setData(parsed);
      setError(null);
      toast.success("OpsBot data saved successfully!");
    } catch (err: any) {
      setError("Invalid JSON: " + err.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">OpsBot JSON Editor</h2>

      <textarea
        className="w-full h-[700px] p-3 border rounded font-mono text-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={localData}
        onChange={handleChange}
      />

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <button
        onClick={saveChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
      >
        Save Changes
      </button>
      <Link href={"/"}>
        <button className="bg-blue-500 text-white px-4 ml-5 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
          Home
        </button>
      </Link>
    </div>
  );
};
