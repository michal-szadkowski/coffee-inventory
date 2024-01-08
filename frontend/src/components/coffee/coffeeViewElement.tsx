import CoffeeDTO from "../../services/entities/coffeeDTO";

export function CoffeeViewElement({ coffee, actions }: { coffee: CoffeeDTO, actions?: React.ReactNode }) {
    return (
        <div className="col-12 col-xxl-4  my-2 mx-xxl-0">
            <div className="card-body card border border-1 m-xxl-2">
                <h4 className="card-title">{coffee.name}</h4>
                <div className="card-text">{coffee.roaster}</div>
                <div className="card-text">{coffee.origin}</div>
                <div className="card-text">{coffee.description}</div>
                {actions}
            </div>
        </div>)
}