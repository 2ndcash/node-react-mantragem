import React from 'react';
import { usePagination, DOTS } from '../common/usePagination';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className="btn-group">
            <button
                className={`btn btn-primary`}
                onClick={onPrevious}
                disabled={currentPage === 1}
            >
                {`<`}
            </button>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <button key={index} className="btn btn-primary">&#8230;</button>;
                }

                return (
                    <button key={index}
                        className={`btn btn-primary${pageNumber === currentPage ? ' active' : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                className={`btn btn-primary`}
                disabled={currentPage === lastPage}
                onClick={onNext}
            >
                {`>`}
            </button>
        </div>
    );
};

export default Pagination;