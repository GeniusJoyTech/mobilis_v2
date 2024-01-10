import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginacao = ({ lin, itemsPerPage, currentPage, paginate }) => {
  return (
    <Pagination>
      {Array.from({ length: Math.ceil(lin.length / itemsPerPage) }).map(
        (page, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        )
      )}
    </Pagination>
  );
};

export default Paginacao;
