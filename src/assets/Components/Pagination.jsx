import Style from "../Styles/Pagination.module.css";
export default function Pagination({ currentPage, paginatedData, setCurrentPageIndex, currentPageIndex }) {

    return (
        <div className={Style.paginationContainer}>
            {paginatedData.map((page, i) => (
                <button
                    key={page}
                    className={Style[page === currentPage ? "pageBtn_active" : "pageBtn"]}
                    onClick={() => onPageChange(page)}>
                    {i + 1}
                </button>
            ))}
            <button disabled={currentPageIndex == paginatedData?.length - 1} className={Style.arrowBtn} onClick={() => setCurrentPageIndex(currentPageIndex + 1)}>
                <svg
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 6.78467H17.3" stroke="#1F221F" stroke-width="0.8" />
                    <path
                        d="M10.1407 12.6219C10.1407 12.6219 12.4316 6.78473 17.1936 6.78473C12.43 6.78473 10.1407 0.94751 10.1407 0.94751"
                        stroke="#1F221F"
                    />
                </svg>
            </button>
        </div>
    );
}
