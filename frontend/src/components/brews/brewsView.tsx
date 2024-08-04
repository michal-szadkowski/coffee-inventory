import {useEffect, useState} from "react"
import BrewDTO from "../../services/entities/brewDTO";
import {BrewService} from "../../services/brewsService";
import BrewWizard from "./brewWizard";
import ExpandButton from "../expandButton";
import Grid from "../grid";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import {InventoryService} from "../../services/inventoryService";
import BrewsList from "./brewsList";


export default function BrewsView() {

    let [load, setLoad] = useState(true);
    let [brewEdited, setEdited] = useState<BrewDTO | undefined>();
    let [inventory, setInventory] = useState<InventoryItemDTO[]>([]);
    let [brews, setBrews] = useState<BrewDTO[]>([]);

    useEffect(() => {
        if (load === true) {
            BrewService.GetAll().then(x => setBrews(x.data)).then(() => setLoad(false));
            InventoryService.GetAll().then(x => setInventory(x.data)).then(() => setLoad(false));
        }
    }, [load])

    return (
        <>
            <Grid
                left={
                    <>
                        <h5>dodaj nowe</h5>
                        <ExpandButton>
                            <BrewWizard
                                brew={undefined}
                                submit={(x) => {
                                    BrewService.Add(x).then(() => setLoad(true));
                                }}
                                inventory={inventory}/>
                        </ExpandButton>

                        {brewEdited !== undefined && (
                            <>
                                <h5>edycja</h5>
                                <BrewWizard
                                    brew={brewEdited}
                                    submit={(x) => {
                                        BrewService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true))
                                    }}
                                    close={() => setEdited(undefined)}
                                    inventory={inventory}/>
                            </>)}

                    </>

                }
                center={
                    <BrewsList
                        brews={brews}
                        inventory={inventory}
                        select={(brew) => setEdited(brew)}
                        reload={() => setLoad(true)}/>
                }
            />

        </>


    )
}