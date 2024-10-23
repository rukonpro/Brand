export default function ShippingBillingCard({ toggleDrawer2, address, title }) {


  return (
    <div className="p-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <button
          onClick={toggleDrawer2}
          className="text-blue-500 dark:text-blue-400 hover:underline">
          EDIT
        </button>
      </div>
      <div className="mb-4">
        <p className="font-semibold text-slate-800 dark:text-slate-100">{address?.firstName} {address?.lastName}</p>
        <p className="text-slate-600 dark:text-slate-400">{address?.phoneNumber}</p>
      </div>
      <div className="mb-4">
        <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
          HOME
        </span>
        <span className="text-slate-700 dark:text-slate-300">
          {address?.state} - {address?.houseNumber}  - {address?.city} -{address?.postalCode} - {address?.country}
        </span>
      </div>
      {/* <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <a
            href="#"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Collect your parcel from the nearest Daraz Pick-up Point with a reduced shipping fee
          </a>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            2 suggested collection point(s) nearby
          </p>
        </div> */}
    </div>
  );
}
