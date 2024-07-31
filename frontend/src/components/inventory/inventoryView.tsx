import {useEffect, useState} from "react";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import {InventoryService} from "../../services/inventoryService";
import InventoryWizard from "./inventoryWizard";
import ExpandButton from "../expandButton";
import Grid from "../grid";
import ItemsList from "./itemsList";


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
                <ItemsList inventory={inventory} reload={() => setLoad(true)} select={(x) => setEdited(x)}/>
            }

        />
    )
}