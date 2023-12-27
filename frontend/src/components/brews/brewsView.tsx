import { useEffect, useState } from "react"
import BrewDTO from "../../services/entities/brewDTO";
import { BrewService } from "../../services/brewsService";
import { InventoryItemDTO } from "../../services/entities/inventoryItemDTO";
import { BrewViewElement } from "./brewViewElement";
import BrewWizard from "./brewWizard";
import { InventoryService } from "../../services/inventoryService";
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
    return (
        <div>
            {extendedBrews.map((x, i) =>
            (<BrewViewElement brew={x.brew} key={i} usedItems={x.items}
                actions={
                    <div>
                        <button onClick={() => setEdited(x.brew)} className="btn btn-info m-1">Edytuj</button>
                        <button onClick={() => BrewService.Delete(x.brew.id).then(() => setLoad(true))} className="btn btn-danger">Usuń</button>
                    </div>} />
            ))}

            {brewEdited !== undefined && (
                <BrewWizard item={brewEdited}
                    submit={(x) => { BrewService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true)) }}
                    close={() => setEdited(undefined)}
                    inventory={inventory} />)}

            <div className="m-4">
                <h5>dodaj nową</h5>
                <BrewWizard
                    item={undefined}
                    submit={(x) => { console.log(x); BrewService.Add(x).then(() => setLoad(true)) }}
                    inventory={inventory} />
            </div>
        </div>
    )
}