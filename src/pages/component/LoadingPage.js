import { useState, useEffect } from 'react';
import { MdOutlineExplore } from 'react-icons/md';

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center min-h-[98vh] bg-gray-100 z-10">
            {/* TravelNest Logo */}
            <div className="mb-8">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-none animate-pulse">
                    <div className="flex items-center text-xl font-bold text-blue-600">
                        <MdOutlineExplore className="w-8 h-8 mr-2 text-blue-600" />
                        <span>TravelNest</span>
                    </div>
                </div>
            </div>

            {/* Loading Spinner */}
            <div className="mb-8">
                <div className="w-8 h-8 border-gray-300 rounded-full border-3 border-t-blue-600 animate-spin"></div>
            </div>

            {/* Meta Text */}
            <div className="text-center">
                <p className="mb-1 text-sm text-gray-500">from</p>
                <div className="flex items-center space-x-1">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="text-lg font-bold text-blue-600">Blackteam03</span>
                </div>
            </div>

            {/* Loading Progress Bar (Optional) */}
            <div className="w-64 mt-8">
                <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;