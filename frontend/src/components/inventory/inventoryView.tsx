import { useEffect, useState } from "react";
import { InventoryItemDTO } from "../../services/entities/inventoryItemDTO";
import { InventoryService } from "../../services/inventoryService";
import { InventoryViewItem } from "./inventoryViewItem";
import CoffeeDTO from "../../services/entities/coffeeDTO";
import { CoffeeService } from "../../services/coffeeService";
import InventoryWizard from "./inventoryWizard";


export default function InventoryView() {

    let [coffee, setCoffee] = useState<CoffeeDTO[]>([]);
    let [inventory, setInventory] = useState<InventoryItemDTO[]>([]);

    let [itemEdited, setEdited] = useState<InventoryItemDTO | undefined>();

    let [load, setLoad] = useState(true);

    useEffect(() => {
        if (load === true) {
            InventoryService.GetAll().then(x => setInventory(x.data)).then(() => setLoad(false));
            CoffeeService.GetAll().then(x => setCoffee(x.data)).then(() => setLoad(false));
        }
    }, [load])

    let extendedInv = inventory.map(x => ({ item: x, coffee: coffee.find(y => y.id === x.coffeeId) }));
    console.log(extendedInv);
    return (
        <div>
            {extendedInv.map((x, i) =>
            (<InventoryViewItem item={x.item} coffee={x.coffee} key={i} actions={
                <div>
                    <button onClick={() => setEdited(x.item)} className="btn btn-info m-1">Edytuj</button>
                    <button onClick={() => InventoryService.Delete(x.item.id).then(() => setLoad(true))} className="btn btn-danger">Usuń</button>
                </div>} />
            ))}

            {itemEdited !== undefined && (
                <InventoryWizard item={itemEdited}
                    submit={(x) => { InventoryService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true)) }}
                    close={() => setEdited(undefined)}
                    coffeeList={coffee} />)}


            <InventoryWizard submit={(x) => { console.log(x); InventoryService.Add(x).then(x => setLoad(true)) }} coffeeList={coffee}></InventoryWizard>
        </div>
    )
}