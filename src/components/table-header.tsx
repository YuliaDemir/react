export function TableHeader() {
  return (
    <div className="w-full p-2">
      <div className="grid grid-cols-12 gap-3 items-center p-3 bg-blue-500 rounded-2xl">
        <div className="col-span-6 sm:col-span-5 text-sm font-semibold">
          Country
        </div>
        <div className="hidden sm:block col-span-3 text-sm font-semibold">
          Population (latest)
        </div>
        <div className="col-span-6 sm:col-span-2 text-sm font-semibold text-right">
          ISO
        </div>
      </div>
    </div>
  );
}
