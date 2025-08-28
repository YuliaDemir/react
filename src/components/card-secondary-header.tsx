export const CardSecondaryHeader = () => {
  return (
    <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 font-semibold px-2">
      <div>Year</div>
      <div className="text-right">Population</div>
      <div className="text-right">CO₂</div>
      <div className="text-right">CO₂ / cap</div>
    </div>
  );
};
