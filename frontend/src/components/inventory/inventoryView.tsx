import {useEffect, useState} from "react";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import {InventoryService} from "../../services/inventoryService";
import {InventoryViewItem} from "./inventoryViewItem";
import InventoryWizard from "./inventoryWizard";
import ExpandButton from "../expandButton";
import Grid from "../grid";


export default function InventoryView() {

    let [inventory, setInventory] = useState<InventoryItemDTO[]>([]);

    let [itemEdited, setEdited] = useState<InventoryItemDTO | undefined>();

    let [load, setLoad] = useState(true);

    useEffect(() => {
        if (load === true) {
            InventoryService.GetAll()
                .then(x => setInventory(x.data.sort(
                    (a, b) => a.endDate == null ? -1 : 1
                )))
                .then(() => setLoad(false));
        }
    }, [load])

    return (
        <Grid
            left={
                <div>
                    <span className="h5">dodaj nowy</span>
                    <ExpandButton>
                        <InventoryWizard submit={(x) => {
                            InventoryService.Add(x).then(x => setLoad(true))
                        }}></InventoryWizard>
                    </ExpandButton>
                    {itemEdited !== undefined && (
                        <>
                            <h5>edycja</h5>
                            <InventoryWizard item={itemEdited}
                                             submit={(x) => {
                                                 InventoryService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true));
                                             }}
                                             close={() => setEdited(undefined)}
                            />
                        </>)}
                </div>
            }

            center={
                < >
                    {inventory.map((x, i) =>
                        (<InventoryViewItem item={x} key={i} actions={
                                <div>
                                    <button onClick={() => setEdited(x)} className="btn btn-info m-1">Edytuj
                                    </button>
                                    <button onClick={() => InventoryService.Delete(x.id).then(() => setLoad(true))}
                                            className="btn btn-danger">Usuń
                                    </button>
                                </div>}/>
                        ))}
                </>

            }

        />
    )
}