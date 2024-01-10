import { useEffect, useState } from "react"
import { CoffeeService } from "../../services/coffeeService"
import CoffeeDTO from "../../services/entities/coffeeDTO"
import { CoffeeViewElement } from "./coffeeViewElement"
import CoffeeWizard from "./coffeeWizard"
import ExpandButton from "../expandButton"
import Grid from "../grid"

export default function CoffeeView() {

    let [coffee, setCoffee] = useState<CoffeeDTO[]>([]);
    let [coffeeEdited, setEdited] = useState<CoffeeDTO | undefined>();

    let [load, setLoad] = useState(true);

    useEffect(() => {
        if (load === true)
            CoffeeService.GetAll().then(x => setCoffee(x.data)).then(() => setLoad(false));
    }, [load])

    return (
        <Grid
            left={
                <div>
                    <span className="h5">dodaj nową</span>
                    <ExpandButton>
                        <CoffeeWizard
                            coffee={undefined}
                            submit={(x) => { CoffeeService.Add(x).then(() => setLoad(true)) }} />
                    </ExpandButton>
                    {coffeeEdited !== undefined && (
                        <>
                            <h5>edycja</h5>
                            <CoffeeWizard coffee={coffeeEdited}
                                submit={(x) => { CoffeeService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true)) }}
                                close={() => setEdited(undefined)} />
                        </>)}
                </div>
            }
            center={
                <>
                    {coffee.map((x, i) => (<CoffeeViewElement coffee={x} key={i}
                        actions={<div>
                            <button onClick={() => setEdited(x)} className="btn btn-info m-1">Edytuj</button>
                            <button onClick={() => CoffeeService.Delete(x.id).then(() => setLoad(true))} className="btn btn-danger">Usuń</button>
                        </div>} />
                    ))}
                </>
            }
        />

    )
}