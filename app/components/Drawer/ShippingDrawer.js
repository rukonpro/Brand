import { useState } from 'react';

export default function ShippingDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-slate-800 z-50 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Shipping Address</h2>
            <button
              onClick={toggleDrawer}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
            >
              X
            </button>
          </div>

          {/* Address Content */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded-full mr-2"></div>
              <div className="flex flex-col">
                <span className="font-medium dark:text-white">Md Rukon</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">1765459224</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              fenibil, Sunamganj Sadar, Sunamganj, Sylhet
            </div>

            <div className="flex gap-2 mb-4">
              <button className="px-2 py-1 bg-blue-200 dark:bg-blue-700 text-blue-600 dark:text-blue-300 rounded text-sm">
                Default Shipping Address
              </button>
              <button className="px-2 py-1 bg-blue-200 dark:bg-blue-700 text-blue-600 dark:text-blue-300 rounded text-sm">
                Default Billing Address
              </button>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={toggleDrawer}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
