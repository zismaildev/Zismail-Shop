import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineHome, AiOutlineDatabase, AiOutlineUser, AiOutlineSetting, AiOutlineMessage } from 'react-icons/ai';
import Link from 'next/link';

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="flex pt-16">
                <div
                    className={`fixed top-16 left-0 h-full bg-blue-800 shadow-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
                        } transition-transform duration-300 ease-in-out w-64 z-40 overflow-y-auto`}
                >
                    <nav className="p-4 text-white">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 bg-blue-600 rounded flex items-center mb-4"
                        >
                            <AiOutlineMenu size={24} />
                        </button>
                        <div className={`text-center font-bold text-lg mb-4 ${!isOpen && 'hidden'}`}>ZismailDev</div>
                        <Link href="/overview">
                            <div className="flex items-center p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
                                <AiOutlineHome size={24} />
                                <span className={`ml-2 ${!isOpen && 'hidden'}`}>Overview</span>
                            </div>
                        </Link>
                        <div className="mt-4">
                            <div className={`font-semibold text-sm mb-2 ${!isOpen && 'hidden'}`}>Product</div>
                            <Link href="/admin/overview">
                                <div className="flex items-center p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
                                    <AiOutlineDatabase size={24} />
                                    <span className={`ml-2 ${!isOpen && 'hidden'}`}>All Product</span>
                                </div>
                            </Link>
                            <Link href="/products/create">
                                <div className="flex items-center p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
                                    <AiOutlineDatabase size={24} />
                                    <span className={`ml-2 ${!isOpen && 'hidden'}`}>Create</span>
                                </div>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <div className={`font-semibold text-sm mb-2 ${!isOpen && 'hidden'}`}>User management</div>
                            <Link href="/services/device-sync">
                                <div className="flex items-center p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
                                    <AiOutlineUser size={24} />
                                    <span className={`ml-2 ${!isOpen && 'hidden'}`}>All User</span>
                                </div>
                            </Link>
                            <Link href="/services/triggers">
                                <div className="flex items-center p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
                                    <AiOutlineMessage size={24} />
                                    <span className={`ml-2 ${!isOpen && 'hidden'}`}>Triggers</span>
                                </div>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <div className={`font-semibold text-sm mb-2 ${!isOpen && 'hidden'}`}>SECURITY</div>
                            <Link href="/security/backup">
                                <div className="flex items-center p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200">
                                    <AiOutlineSetting size={24} />
                                    <span className={`ml-2 ${!isOpen && 'hidden'}`}>Backup</span>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
                <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'} p-4`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
