import React from 'react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex space-x-2 animate-pulse">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            </div>
            <p className="ml-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
    );
}
