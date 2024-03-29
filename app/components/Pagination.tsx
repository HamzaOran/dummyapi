import React from 'react';
import Link from 'next/link';

type PaginationPropsType = {
  toplam: number;
  id: number;
  base: string;
  eleman?: number;
};

export default function Pagination({
  toplam,
  id,
  base,
  eleman = 20,
}: PaginationPropsType) {
  const toplamSayfa = Math.ceil(toplam / eleman);
  const oncekiSayfa = id - 1;
  const sonrakiSayfa = id + 1;
  const sonrakiVarMi = sonrakiSayfa <= toplamSayfa;
  const oncekiVarMi = id === 1;

  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          href={`${base}/${oncekiSayfa}`}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
            oncekiVarMi ? '200' : '700'
          } bg-white hover:text-gray-${
            oncekiVarMi ? '100' : '500'
          } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            oncekiVarMi && 'pointer-events-none'
          }`}
        >
          Previous
        </Link>

        <Link
          href={`${base}/${sonrakiSayfa}`}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
            !sonrakiVarMi ? '200' : '700'
          } bg-white hover:text-gray-${
            !sonrakiVarMi ? '100' : '500'
          } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            !sonrakiVarMi && 'pointer-events-none'
          }`}
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm leading-5 text-gray-700">
            Total <span className="font-medium">{toplam}</span> results are
            shown between{' '}
            <span className="font-medium">{(id - 1) * eleman + 1}</span> and{' '}
            <span className="font-medium">
              {id * eleman >= toplam ? toplam : id * eleman}
            </span>
            .
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex shadow-sm">
            <Link
              href={`${base}/${oncekiSayfa}`}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-${
                oncekiVarMi ? '200' : '500'
              } hover:text-gray-${
                oncekiVarMi ? '100' : '400'
              } focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
                oncekiVarMi && 'pointer-events-none'
              }`}
              aria-label="Previous"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {Array.from({ length: 5 }).map((_, i) => {
              if (id + i - 2 > 0 && id + i - 2 <= toplamSayfa) {
                return (
                  <Link
                    key={i}
                    href={`${base}/${id + i - 2}`}
                    className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                      id === id + i - 2 && 'bg-gray-200 pointer-events-none'
                    }`}
                  >
                    {id + i - 2}
                  </Link>
                );
              }
            })}

            <Link
              href={`${base}/${sonrakiSayfa}`}
              className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-${
                !sonrakiVarMi ? '200' : '500'
              } hover:text-gray-${
                !sonrakiVarMi ? '100' : '400'
              } focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
                !sonrakiVarMi && 'pointer-events-none'
              }`}
              aria-label="Next"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
