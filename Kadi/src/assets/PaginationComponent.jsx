import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Page = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <Pagination>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          linkStyle={{
            color: 'black',
            fontWeight: 'normal',
            backgroundColor: index + 1 === currentPage ? '#d9d9d9' : 'transparent',
            border: 'none',
          }}
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Page;