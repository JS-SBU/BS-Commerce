import type { NextComponentType } from 'next';

import SearchItems from '@/modules/search/components/searchItem';
import Breadcrumb from '@/modules/common/breadcrumbs/breadcrumb';
import { useEffect, useState } from 'react';
import { Pagination } from '../global/components/pagination';
import useTranslation from 'next-translate/useTranslation';

const SearchComponent: NextComponentType = () => {
  const navSearchInput = document.getElementById(
    'navSearchInput'
  ) as HTMLInputElement;
  const navSearchText = navSearchInput?.value;

  const [searchText, setSearchText] = useState(
    navSearchText ? navSearchText : ''
  );
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const onProductSearch = () => {
    if (
      searchText !=
      (document.getElementById('productSearchInput') as HTMLInputElement).value
    ) {
      setSearchText(
        (document.getElementById('productSearchInput') as HTMLInputElement)
          .value
      );
      setCurrentPage(1);
    }
  };
  const { t } = useTranslation();

  useEffect(() => {
    if (navSearchText?.length > 0) {
      setSearchText(navSearchText);
      (
        document.getElementById('productSearchInput') as HTMLInputElement
      ).value = navSearchText;
      navSearchInput?.value ? (navSearchInput.value = '') : '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, navSearchText]);
  useEffect(() => {
    onProductSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <>
      <Breadcrumb
        title={`${
          searchText.length > 0
            ? `${t('search:page_title')}: ${totalProducts} 
            ${t('search:results_found')}`
            : t('search:page_title')
        }`}
        pathArray={[
          t('common:home'),
          `${
            searchText.length > 0
              ? `${t('search:page_title')}: ${totalProducts} 
              ${t('search:results_found')}`
              : t('search:page_title')
          }`,
        ]}
        linkArray={['/', '/search']}
      />
      <div className="container mx-auto px-4 tracking-wider">
        <h4 className="title-font mt-16 mb-1 text-center text-sm  font-normal text-gray-900">
          {searchText ? (
            <>
              {t('search:pre-text')}{' '}
              <strong className="highlight">{searchText}</strong>
              {t('search:post-text')}:
            </>
          ) : (
            <>{t('search:search_for_products_on_our_site')}</>
          )}
        </h4>

        <div className="mt-5 flex justify-center">
          <div className="mb-3 w-full sm:w-full md:w-2/3">
            <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                id="productSearchInput"
                className="form-control relative m-0 block w-full min-w-0 flex-auto rounded-3xl border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                placeholder={t('common:search_placeholder')}
                onChange={() => onProductSearch()}
              />
              <button
                type="submit"
                className="absolute right-0 rounded-3xl bg-primary py-1.5 px-4 pb-2 text-base text-white hover:bg-black dark:bg-dark_primary"
                onClick={() => onProductSearch()}
              >
                {t('search:page_title')}
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <SearchItems
            searchText={searchText}
            setTotalProducts={setTotalProducts}
            currentPage={currentPage}
            limit={limit}
          />
          <div
            className={`${
              Math.ceil(totalProducts / limit) <= 1 ? 'hidden' : ''
            } mx-auto w-full sm:w-full md:w-2/3`}
          >
            <Pagination
              totalPages={Math.ceil(totalProducts / limit)}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;