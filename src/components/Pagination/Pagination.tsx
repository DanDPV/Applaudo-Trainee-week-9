/* eslint no-unused-vars: 0 */
import React, { useEffect, useState } from 'react';
import 'components/Pagination/Pagination.scss';

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  onChange(newPage: number): void;
}

interface PaginationOption {
    name: string;
    action: () => void;
}

const Pagination = React.memo(({
  offset,
  limit,
  total,
  onChange,
}: PaginationProps) => {
  const [paginationOptions, setPaginationOptions] = useState<PaginationOption[]>([]);
  const currentPaginationPage = Math.ceil((offset / limit) + 1);

  const totalPages = Math.ceil(total / limit);

  const getNewPage = (newOffset: number) => Math.ceil(newOffset / limit + 1);

  useEffect(() => {
    const optionsHelper = [];
    if (offset - limit !== 0 && offset !== 0) {
      optionsHelper.push({
        name: 'First',
        action: () => onChange(1),
      });
    }
    if (offset > 0) {
      optionsHelper.push({
        name: 'Prev',
        action: () => onChange(getNewPage(offset - limit)),
      });
    }
    if (offset < total - limit) {
      optionsHelper.push({
        name: 'Next',
        action: () => onChange(getNewPage(offset + limit)),
      });
    }
    if (
      (total % limit === 0
        && offset + limit !== total - limit
        && offset !== total - limit)
        || (total % limit !== 0
            && offset + limit !== total - (total % limit)
            && offset !== total - (total % limit))
    ) {
      optionsHelper.push({
        name: 'Last',
        action: () => onChange(
          total % limit === 0
            ? getNewPage(total - limit)
            : getNewPage(total - (total % limit)),
        ),
      });
    }

    setPaginationOptions(optionsHelper);
  }, [limit, offset, total]);

  return (
    <>
      <div className="pagination-options">
        <div className="multi-button">
          {paginationOptions.map(option => (
            <button
              type="button"
              onClick={option.action}
              key={option.name}
              className="pagination-option"
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
      <div className="current-pagination-page">
        <p>
          <b>Page: </b>
          {`${currentPaginationPage} / ${totalPages}`}
        </p>
      </div>
    </>
  );
});

export default Pagination;
