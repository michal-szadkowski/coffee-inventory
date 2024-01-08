import { ReactNode } from "react";

export default function Grid({ left, center }: { left: ReactNode, center: ReactNode }) {
    return (
        <div className="container-fluid row align-items-start justify-content-start g-0 p-1">
            <div className="col-12 col-xxl-3 m-xxl-3 p-0">
                {left}
            </div>

            <div className="row col-12 col-xxl-6 d-flex flex-wrap g-0 p-0">
               {center}
            </div>
        </div>
    )
}