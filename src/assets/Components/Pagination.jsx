import { useEffect, useState } from "react";
import Style from "../Styles/Pagination.module.css";
export default function Pagination({ currentPage, paginatedData, setCurrentPageIndex, currentPageIndex }) {

            return (
                <div className={Style.paginationContainer}>
                {currentPageIndex > 0  && (
                    <>

                        <button
                            
                            className={Style.arrowBtn}
                            onClick={() => setCurrentPageIndex((now) => now - 1)}
                        >
                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 6.78467H0.7" stroke="#1F221F" strokeWidth="0.8" />
                                <path
                                    d="M7.8593 12.6219C7.8593 12.6219 5.5684 6.78473 0.8064 6.78473C5.57 6.78473 7.8593 0.94751 7.8593 0.94751"
                                    stroke="#1F221F"
                                />
                            </svg>
                        </button>
                    
                    </>
                    
                )}


            {paginatedData.map((page, i) => (
                <button
                    key={page}
                    className={Style[page === currentPage ? "pageBtn_active" : "pageBtn"]}
                    onClick={() => setCurrentPageIndex(Number(i))}>
                    {i + 1}
                </button>
            ))}
                {currentPageIndex < (Number(paginatedData.length)- 1)  && (
                    <>
                        <button
                            
                            className={Style.arrowBtn}
                            onClick={() => setCurrentPageIndex((now) => now + 1)}
                        >
                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 6.78467H17.3" stroke="#1F221F" strokeWidth="0.8" />
                                <path
                                    d="M10.1407 12.6219C10.1407 12.6219 12.4316 6.78473 17.1936 6.78473C12.43 6.78473 10.1407 0.94751 10.1407 0.94751"
                                    stroke="#1F221F"
                                />
                            </svg>
                        </button>
                    </>
                )}

        </div>
    );
}
