import { useContext } from "react";
import Style from "../Styles/SortDropdown.module.css";
import { ContextVariables } from "../context-variables/ContextVariables";
import { paginateReviews } from "../helpers/paginateReviews.js";
import { sortOneToFive, filterHaveMedia, fiterUsefullReviews } from "../helpers/sortingReviews.js";
export function SortDropdown({ setCurrentPageIndex, setCurrentPage }) {
    const { setPaginatedData, url } = useContext(ContextVariables);
    async function applySort(e) {
        const value = e.target.value;

        const data = await fetchReviews(url);
        if (!data) return;
        let newData;
        if (value === "highest") {
            newData = paginateReviews(data);
            setPaginatedData(newData);
        } else if (value === "lowest") {
            newData = sortOneToFive(data);
            setPaginatedData(newData);
        } else if (value === "picture") {
            newData = filterHaveMedia(data)
            setPaginatedData(newData);
        } else if (value === "helpful") {
            newData = fiterUsefullReviews(data);
            setPaginatedData(newData);
        }

        setCurrentPageIndex(0);
        setCurrentPage(newData?.[0] ?? undefined);
    }

    return (
        <label className="SortDropdown">
            <b>Sort by:&nbsp;</b>

            <select
                onChange={async (e) => {
                    await applySort(e);
                }}>
                <option value="highest">
                    Highest Rating
                </option>
                <option value="lowest">Lowest Rating</option>
                <option value="picture">Only Pictures</option>
                <option value="helpful">Most Helpful</option>
            </select>
        </label>
    );
}
export async function fetchReviews(url) {
    const productSlug = window.location.pathname.replace("/products/", ``);

    const endpoint = url + `/product/` + productSlug;
    console.log(endpoint)
    const res = await fetch(endpoint);
    if (!res.ok) return null;
    if (res.status == 200) {
        const data = await res.json();

        return data?.reviews;
    }
    return undefined;
}
