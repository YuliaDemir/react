import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectYear } from '../state/slice-year-search';

import type { RootState } from '../state/store';

export function TableHeader() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'population' | 'name'>(
    'population',
  );
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const dispatch = useDispatch();
  const { year, years } = useSelector((state: RootState) => state.yearSearch);

  const toggleDir = () => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));

  return (
    <div className="w-full p-2">
      <div className="grid grid-cols-12 gap-3 items-center p-3 bg-blue-500 rounded-2xl text-white">
        <div className="col-span-3 flex items-center space-x-2">
          <label htmlFor="year" className="font-semibold">
            Year:
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => dispatch(selectYear(Number(e.target.value)))}
            className="text-black rounded-lg px-2 py-1"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="col-span-5">
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1 rounded-lg text-black"
          />
        </div>

        {/* Sorting */}
        <div className="col-span-4 flex items-center space-x-2 justify-end">
          <select
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value as 'population' | 'name')
            }
            className="text-black rounded-lg px-2 py-1"
          >
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={toggleDir}
            className="bg-white text-blue-600 rounded-lg px-2 py-1 hover:bg-gray-200"
          >
            {sortDir === 'asc' ? '▲' : '▼'}
          </button>
        </div>
      </div>
    </div>
  );
}
