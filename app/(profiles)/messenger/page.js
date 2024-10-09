import React from 'react';
import { FaUserFriends, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

export const metadata = {
    title: "Messenger - Brand",
    description: "Stay connected with Brand's Messenger. Chat in real-time, get instant customer support, and connect with friends or sellers for quick updates on your orders and products.",
};

const Messenger =  () => {

    return (
        <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full h-1/3 md:h-full bg-gray-900 text-white flex flex-col items-center py-6">
        <div className="text-2xl mb-8">
          <FaUserCircle className="text-4xl mb-2" />
          <h1 className="font-bold">Messenger</h1>
        </div>
        <div className="flex-grow w-full">
          <ul className="space-y-4">
            <li className="cursor-pointer flex items-center space-x-2 hover:bg-gray-700 p-3">
              <FaUserFriends className="text-2xl" />
              <span>Friends</span>
            </li>
            <li className="cursor-pointer flex items-center space-x-2 hover:bg-gray-700 p-3">
              <FaUserCircle className="text-2xl" />
              <span>Chats</span>
            </li>
          </ul>
        </div>
        <div className="w-full text-center">
          <button className="flex items-center justify-center w-full py-3 hover:bg-gray-700">
            <IoMdSettings className="text-2xl" />
            <span className="ml-2">Settings</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="md:w-3/4 w-full h-2/3 md:h-full flex flex-col bg-gray-100">
        {/* Chat Messages */}
        <div className="flex-grow p-6 space-y-4 overflow-y-auto">
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
              Hi, how are you?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xs">
              I'm good, thank you!
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t flex items-center">
          <input
            type="text"
            className="flex-grow border rounded-lg p-2 mr-2"
            placeholder="Type a message..."
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
    );
};

export default Messenger;