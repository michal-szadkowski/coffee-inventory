import CoffeeDTO from "../../services/entities/coffeeDTO";

export function CoffeeViewElement({ coffee, actions }: { coffee: CoffeeDTO, actions?: React.ReactNode }) {
    const labelStyle = "col-6 col-xxl-5 fst-italic fw-lighter"
    const itemStyle = "col-6 col-xxl-7"
    return (
        <div className=" col-12 col-lg-6 col-xxl-4 my-2 mx-xxl-0">
            <div className="card-body card border border-2">
                <h4 className="card-title">{coffee.name}</h4>
                <div className="card-text row g-0 gx-1">
                    <div className={labelStyle}>Palarnia:</div>
                    <div className={itemStyle}>{coffee.roaster}</div>
                    <div className={labelStyle}>Pochodzenie:</div>
                    <div className={itemStyle}>{coffee.origin}</div>
                    <div className={labelStyle}>Opis:</div>
                    <div className="col-12">{coffee.description}</div>
                </div>
                {actions}
            </div>
        </div>)
}