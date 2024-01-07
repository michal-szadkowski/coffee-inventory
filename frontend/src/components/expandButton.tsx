import { useState } from "react"

export default function ExpandButton(props: { children: React.ReactNode }) {
    let [expand, setExpand] = useState(false);
    let btnClass = "mb-3 btn ";
    btnClass += expand ? "btn-warning" : "btn-success";
    return (
        <div className="">
            <button className={btnClass} style={{ width: "50px" }} onClick={() => setExpand(!expand)}>{expand ? "-" : "+"}</button>
            {expand && (props.children)}
        </div>
    )
}