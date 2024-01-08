import { useState } from "react"

export default function ExpandButton(props: { children: React.ReactNode }) {
    let [expand, setExpand] = useState(false);
    let btnClass = "m-3 btn ";
    btnClass += expand ? "btn-warning" : "btn-success";
    return (
        <>
            <button className={btnClass} style={{ width: "50px" }} onClick={() => setExpand(!expand)}>{expand ? "-" : "+"}</button>
            {expand && (props.children)}
        </>
    )
}