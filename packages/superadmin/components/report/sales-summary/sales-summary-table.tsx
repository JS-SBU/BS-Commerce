import { useEffect, useMemo, useState } from 'react';

import Table from '../../global/table/table';
import salesSummaryData from '../../../data/sales-summary.json';
import Pagination from '../../global/pagination';

const SalesTable = () => {
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(7);

  const columns = [
    {
      label: 'Summary',
      path: 'summary',
      content: (data: any, key: any, index: any) => <td>{data[key]}</td>,
    },
    {
      label: 'Number Of Orders',
      path: 'noOfOrders',
      content: (data: any, key: any, index: any) => <td>{data[key]}</td>,
    },
    {
      label: 'Profit',
      path: 'profit',
      content: (data: any, key: any, index: any) => <td>{data[key]}</td>,
    },
    {
      label: 'Shipping',
      path: 'shipping',
      content: (data: any, key: any, index: any) => <td>{data[key]}</td>,
    },
    {
      label: 'Tax',
      path: 'tax',
      content: (data: any, key: any, index: any) => <td>{data[key]}</td>,
    },
    {
      label: 'Order Total',
      path: 'orderTotal',
      content: (data: any, key: any, index: any) => <td>{data[key]}</td>,
    },
  ];

  const paginateData = (data: any) => {
    const start = (activePage - 1) * pageCount;
    const paginatedData = data.slice(start, start + pageCount);
    return paginatedData;
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return salesSummaryData['salesSummary']?.slice(
      firstPageIndex,
      lastPageIndex
    );
  }, [currentPage, PageSize, salesSummaryData['salesSummary']]);

  const handleClickPage = (activePage: any) => {
    setActivePage(activePage);
  };

  const paginatedData = paginateData(salesSummaryData['salesSummary']);

  useEffect(() => {
    paginateData(salesSummaryData['salesSummary']);
  }, [pageCount]);

  return (
    <>
      <div className="card border-1 mt-3 rounded px-2">
        <div className="card-body">
          <p>
            Learn more about{' '}
            <a href="#" style={{ textDecoration: 'none' }}>
              {' '}
              reports
            </a>
          </p>
          <Table items={currentTableData} columns={columns} />

          <div className="">
            {salesSummaryData['salesSummary']?.length > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalCount={salesSummaryData['salesSummary'].length}
                pageSize={PageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
              />
            ) : null}
          </div>

          {/* <div className="d-flex flex-column align-items-center flex-xs-column flex-sm-column flex-md-column flex-lg-row flex-xl-row align-items-xs-center align-items-sm-center align-items-md-center justify-content-lg-between justify-content-xl-between flex-wrap">
            <div className="d-flex justify-content-center flex-wrap">
              <span>
                <span style={{ margin: '10px' }}>Show</span>
                <button
                  className="dropdown"
                  style={{
                    padding: '10px',
                    border: '1px solid gray',
                  }}
                >
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      padding: '10px',
                    }}
                  >
                    {pageCount}
                  </a>
                  <div className="dropdown-menu">
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => setPageCount(7)}
                    >
                      7
                    </a>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => setPageCount(15)}
                    >
                      15
                    </a>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => setPageCount(20)}
                    >
                      20
                    </a>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => setPageCount(50)}
                    >
                      50
                    </a>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => setPageCount(100)}
                    >
                      100
                    </a>
                  </div>
                </button>
                <span style={{ margin: '10px' }}>items</span>
              </span>
            </div>

            <p>
              {` ${(activePage - 1) * pageCount + 1} - ${
                (activePage - 1) * pageCount + pageCount
              } of ${paginateData.length} items`}
              <span className="ms-2">
                <button style={{ border: 'none' }}>
                  <i className="bi bi-arrow-clockwise align-items-center"></i>
                </button>
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SalesTable;