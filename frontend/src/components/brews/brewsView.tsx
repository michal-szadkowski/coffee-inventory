import { useEffect, useState } from "react"
import BrewDTO from "../../services/entities/brewDTO";
import { BrewService } from "../../services/brewsService";
import { InventoryItemDTO } from "../../services/entities/inventoryItemDTO";
import { BrewViewElement } from "./brewViewElement";
import BrewWizard from "./brewWizard";
import { InventoryService } from "../../services/inventoryService";
import ExpandButton from "../expandButton";
import CoffeeDTO from "../../services/entities/coffeeDTO";
import { CoffeeService } from "../../services/coffeeService";


export default function BrewsView() {

    let [brews, setBrews] = useState<BrewDTO[]>([]);
    let [brewEdited, setEdited] = useState<BrewDTO | undefined>();
    let [coffee, setCoffee] = useState<CoffeeDTO[]>([]);


    let [inventory, setInventory] = useState<InventoryItemDTO[]>([]);

    let [load, setLoad] = useState(true);

    useEffect(() => {
        if (load === true) {
            BrewService.GetAll().then(x => setBrews(x.data)).then(() => setLoad(false));
            InventoryService.GetAll().then(x => setInventory(x.data)).then(() => setLoad(false));
            CoffeeService.GetAll().then(x => setCoffee(x.data)).then(() => setLoad(false));
        }
    }, [load])
    const extendedBrews = brews.map(x => ({ brew: x, items: inventory.filter(y => x.usage.map(z => z.itemId).includes(y.id)) }))
    const extendedInv = inventory.map(x => ({ inv: x, coffee: coffee.find(y => y.id === x.coffeeId) }));
    return (
        <div className="container-fluid row align-items-start justify-content-start">
            <div className="col-12 col-xxl-4 m-xl-3 " >
                <h5>dodaj nowe</h5>
                <ExpandButton>
                    <BrewWizard
                        brew={undefined}
                        submit={(x) => { BrewService.Add(x).then(() => setLoad(true)) }}
                        inventory={extendedInv} />
                </ExpandButton>


                {brewEdited !== undefined && (
                    <BrewWizard brew={brewEdited}
                        submit={(x) => { BrewService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true)) }}
                        close={() => setEdited(undefined)}
                        inventory={extendedInv} />)}
            </div>

            <div className="row col-12 col-xxl-4 d-flex flex-wrap">
                {extendedBrews.map((x, i) =>
                (<BrewViewElement brew={x.brew} key={i} usedItems={x.items}
                    actions={
                        <div>
                            <button onClick={() => setEdited(x.brew)} className="btn btn-info m-1">Edytuj</button>
                            <button onClick={() => BrewService.Delete(x.brew.id).then(() => setLoad(true))} className="btn btn-danger">Usuń</button>
                        </div>} />
                ))}
            </div>


        </div>
    )
}