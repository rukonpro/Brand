export default function ShippingBillingSkeleton() {
    return (
        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-24 bg-slate-300 dark:bg-slate-700 rounded"></div>
                <div className="h-6 w-12 bg-blue-200 dark:bg-blue-700 rounded"></div>
            </div>
            <div className="mb-4">
                <div className="h-5 w-32 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-600 rounded"></div>
            </div>
            <div className="mb-4">
                <div className="inline-block h-6 w-10 bg-red-300 dark:bg-red-600 rounded-full mr-2"></div>
                <div className="h-4 w-64 bg-slate-200 dark:bg-slate-600 rounded"></div>
            </div>
            {/* <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
                <div className="h-3 w-40 bg-slate-200 dark:bg-slate-600 rounded"></div>
            </div> */}
        </div>
    );
}
