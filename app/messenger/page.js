import React from 'react';
import { FaUserCircle, FaPaperPlane, FaBell } from 'react-icons/fa';
import Navbar from '../components/navbar/navbar';

export const metadata = {
  title: "Messenger - Brand",
  description: "Stay connected with Brand's Messenger. Chat in real-time, get instant customer support, and connect with friends or sellers for quick updates on your orders and products.",
};

const Messenger = () => {

  return (
    <div className='relative'>
      <div className="fixed top-0 w-full">
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row h-screen ">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full bg-white shadow-lg p-4 pt-20 md:block hidden">
          <h1 className="text-2xl font-bold mb-6">Chat ONN</h1>
          <input
            type="text"
            className="border rounded-lg p-2 w-full mb-4"
            placeholder="Search"
          />
          <h2 className="font-semibold">Chats</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
              <FaUserCircle className="text-xl mr-2" />
              <span>Ankit Mishra</span>
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
              <FaUserCircle className="text-xl mr-2" />
              <span>Akanaksha Sinha</span>
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
              <FaUserCircle className="text-xl mr-2" />
              <span>Harshit Nagar</span>
            </li>
          </ul>
        </div>

        {/* Chat Area */}
        <div className="md:w-1/2 w-full h-full  shadow-lg flex flex-col md:pt-20 pt-28">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">Kirti Yadav</h2>
            <span className="text-gray-500 dark:text-slate-50">Last seen 3 hours ago</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="bg-blue-100 p-3 rounded-lg max-w-xs">
                Hey Listen
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-green-100 p-3 rounded-lg max-w-xs">
                Sounds perfect!
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-blue-100 p-3 rounded-lg max-w-xs">
                I really like your idea, but I still think we can do more in this.
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t flex items-center">
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

        {/* Notifications & Suggestions */}
        <div className="md:w-1/4 w-full  bg-white shadow-lg p-4 pt-20 md:block hidden">
          <h2 className="font-semibold mb-4">Notifications</h2>
          <ul className="space-y-2">
            <li className="flex items-center p-2 border-b hover:bg-gray-200">
              <FaBell className="text-xl mr-2" />
              <span>@Ankit mentioned you in Trip to God</span>
            </li>
            <li className="flex items-center p-2 border-b hover:bg-gray-200">
              <FaBell className="text-xl mr-2" />
              <span>{"@Rokash Singh added you in group 'Study'"}</span>
            </li>
            <li className="flex items-center p-2 border-b hover:bg-gray-200">
              <FaBell className="text-xl mr-2" />
              <span>@Ankit mentioned you in public chat</span>
            </li>
          </ul>

          <h2 className="font-semibold mt-4 mb-2">Suggestions</h2>
          <ul className="space-y-2">
            <li className="flex items-center p-2 border rounded-lg hover:bg-gray-200">
              <span>Abhimann Singh</span>
              <button className="ml-auto bg-blue-500 text-white rounded-full px-3">Add</button>
            </li>
            <li className="flex items-center p-2 border rounded-lg hover:bg-gray-200">
              <span>Ved Prakash</span>
              <button className="ml-auto bg-blue-500 text-white rounded-full px-3">Add</button>
            </li>
            <li className="flex items-center p-2 border rounded-lg hover:bg-gray-200">
              <span>Amit Trivedi</span>
              <button className="ml-auto bg-blue-500 text-white rounded-full px-3">Add</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Messenger;