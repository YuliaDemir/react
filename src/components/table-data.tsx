import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { CardData } from './card-data';
import { CardPrimaryHeader } from './card-primary-header';
import { CardSecondaryHeader } from './card-secondary-header';
import { Loader } from './loader';
import { setYears } from '../state/slice-year-search';
import { useBigJson } from '../utils/use-big-json';

export const TableData = () => {
  const { data, loading } = useBigJson();
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const dispatch = useDispatch();

  if (loading) {
    return <Loader />;
  }

  const countries = Object.entries(data);
  dispatch(setYears(countries[0][1].data.map((d) => d.year).reverse()));

  return (
    <div className="grid gap-4">
      {countries?.length ? (
        countries.map(([country, { iso_code, data: dataAsc }]) => {
          const latest = dataAsc[dataAsc.length - 1];
          const isOpen = openCountry === iso_code;
          const dataDesc = dataAsc.toReversed();

          return (
            <article
              key={iso_code || country}
              className="bg-blue-200 shadow-sm rounded-2xl p-4
              cursor-pointer hover:bg-blue-400 transition-colors"
            >
              <CardPrimaryHeader
                iso_code={iso_code}
                population={latest?.population ?? 'N/A'}
                region="4444"
                country={country}
                isOpen={isOpen}
                onClick={() => setOpenCountry(isOpen ? null : iso_code)}
              />
              {isOpen && (
                <div className="mt-4 grid gap-2">
                  <CardSecondaryHeader />
                  <CardData data={dataDesc} iso={iso_code} />
                </div>
              )}
            </article>
          );
        })
      ) : (
        <div className="p-6 text-center text-gray-500">
          No countries to display.
        </div>
      )}
    </div>
  );
};
export default TableData;
