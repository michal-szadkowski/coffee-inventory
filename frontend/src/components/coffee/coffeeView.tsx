import { useEffect, useState } from "react"
import { CoffeeService } from "../../services/coffeeService"
import CoffeeDTO from "../../services/entities/coffeeDTO"
import { CoffeeViewElement } from "./coffeeViewElement"
import CoffeeWizard from "./coffeeWizard"
import ExpandButton from "../expandButton"

export default function CoffeeView() {

    let [coffee, setCoffee] = useState<CoffeeDTO[]>([]);
    let [coffeeEdited, setEdited] = useState<CoffeeDTO | undefined>();

    let [load, setLoad] = useState(true);

    useEffect(() => {
        if (load === true)
            CoffeeService.GetAll().then(x => setCoffee(x.data)).then(() => setLoad(false));
    }, [load])

    return (
        <div>
            <div className="m-4" style={{ width: "fit-content" }}>
                <h5>dodaj nową</h5>
                <ExpandButton>
                    <CoffeeWizard
                        coffee={undefined}
                        submit={(x) => {CoffeeService.Add(x).then(() => setLoad(true)) }} />
                </ExpandButton>
            </div>

            {coffee.map((x, i) =>
            (<CoffeeViewElement coffee={x} key={i}
                actions={
                    <div>
                        <button onClick={() => setEdited(x)} className="btn btn-info m-1">Edytuj</button>
                        <button onClick={() => CoffeeService.Delete(x.id).then(() => setLoad(true))} className="btn btn-danger">Usuń</button>
                    </div>} />
            ))}

            {coffeeEdited !== undefined && (
                <CoffeeWizard coffee={coffeeEdited}
                    submit={(x) => { CoffeeService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true)) }}
                    close={() => setEdited(undefined)} />)}


        </div>
    )
}