export const Header = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Countries overview
        </h1>
        <p className="text-sm text-gray-500">
          Name, latest population (by year), ISO code, and yearly CO₂ stats.
        </p>
      </div>
    </div>
  );
};
