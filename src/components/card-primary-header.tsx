import type { CardPrimaryHeaderType } from '../types';

export const CardPrimaryHeader = ({
  iso_code,
  country,
  region,
  population,
  onClick,
  isOpen,
}: CardPrimaryHeaderType) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-lg font-bold">
          {iso_code
            ? iso_code.slice(0, 2).toUpperCase()
            : country?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-semibold">{country}</div>
          <div className="text-xs text-gray-500">{region ?? 'N/A'}</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:block text-sm">
          <div className="text-xs text-gray-500">Population (latest)</div>
          <div className="font-medium">{population ?? 'N/A'}</div>
        </div>

        <div className="text-sm text-right">
          <div className="text-xs text-gray-500">ISO</div>
          <div className="font-medium">{iso_code ?? 'N/A'}</div>
        </div>
        <span
          className={`inline-block transform transition-transform duration-200 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          ▶
        </span>
      </div>
    </div>
  );
};
