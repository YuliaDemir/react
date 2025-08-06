export const Loader = ({ size = 'w-10 h-10', color = 'border-blue-500' }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin inline-block ${size} border-4 border-solid rounded-full border-t-transparent ${color}`}
        role="status"
      />
    </div>
  );
};
