import { lazy, Suspense } from 'react';

import { Loader } from './loader';
import { TableHeader } from './table-header';
import { TableOptions } from './table-options';

const TableData = lazy(() => import('./table-data'));

export const Table = () => {
  return (
    <div>
      <TableOptions />
      <TableHeader />
      <Suspense fallback={<Loader />}>
        <TableData />
      </Suspense>
    </div>
  );
};

export default Table;
