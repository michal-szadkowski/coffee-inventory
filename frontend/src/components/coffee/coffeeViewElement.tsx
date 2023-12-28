import CoffeeDTO from "../../services/entities/coffeeDTO";

export function CoffeeViewElement({ coffee, actions }: { coffee: CoffeeDTO, actions?: React.ReactNode }) {
    return (
        <div className="card border border-1 m-2" style={{ width: "18rem" }}>
            <div className="card-body">
                <h4 className="card-title">{coffee.name}</h4>
                <p>{coffee.roaster}</p>
                <p>{coffee.origin}</p>
                <p>{coffee.description}</p>
                {actions}
            </div>
        </div>)
}