import {ReactNode, useState} from "react";

export default function Grouping({text, openOnStart, children}: {
    text: string,
    openOnStart: boolean,
    children: ReactNode
}) {

    const [open, setOpen] = useState(openOnStart)

    return (
        <>
            <div className={"text-opacity-25"} onClick={() => setOpen(!open)}>{text} {open ? "⮟" : "⮞"} </div>
            {open && (children)}
        </>
    )
}       