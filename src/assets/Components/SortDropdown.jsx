import Style from "../Styles/SortDropdown.module.css"
export function SortDropdown({ value, onChange }) {
    return (
        <label className="SortDropdown">
            <b>Sort by:&nbsp;</b>
            
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="picture">Only Pictures</option>
                <option value="helpful">Most Helpful</option>
            </select>
        </label>
    );
}