import { ReactNode } from "react";

export default function Grid({ left, center }: { left: ReactNode, center: ReactNode }) {
    return (
        <div className="container-fluid row align-items-start justify-content-start g-0 p-1">
            <div className="col-12 col-md-4 col-lg-4 col-xxl-3 m-xxl-2 p-0">
                {left}
            </div>
            <div className="row col-12 col-lg-8 flex-wrap g-1 p-0">
               {center}
            </div>
        </div>
    )
}