import {useEffect, useState} from "react"
import BrewDTO from "../../services/entities/brewDTO";
import {BrewService} from "../../services/brewsService";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import {BrewViewElement} from "./brewViewElement";
import BrewWizard from "./brewWizard";
import {InventoryService} from "../../services/inventoryService";
import ExpandButton from "../expandButton";
import Grid from "../grid";
import ConfirmDeletePopup from "../popup/confirmDeletePopup";


export default function BrewsView() {

    let [brews, setBrews] = useState<BrewDTO[]>([]);
    let [brewEdited, setEdited] = useState<BrewDTO | undefined>();

    let [inventory, setInventory] = useState<InventoryItemDTO[]>([]);
    let [load, setLoad] = useState(true);

    useEffect(() => {
        if (load === true) {
            BrewService.GetAll().then(x => setBrews(x.data)).then(() => setLoad(false));
            InventoryService.GetAll().then(x => setInventory(x.data)).then(() => setLoad(false));
        }
    }, [load])


    let [popup, setPopup] = useState<BrewDTO | null>
    (null);

    function AcceptDelete() {
        if (popup != null)
            BrewService.Delete(popup.id).then(() => setLoad(true))
        setPopup(null)
    }

    const extendedBrews = brews.map(x => ({
        brew: x,
        items: inventory.filter(y => x.usage.map(z => z.itemId).includes(y.id))
    }))

    return (
        <>
            <ConfirmDeletePopup
                isOpen={popup != null}
                onAccept={() => AcceptDelete()}
                onClose={() => setPopup(null)}
            >
                Czy na pewno chcesz usunąć?
            </ConfirmDeletePopup>
            <Grid
                left={
                    <>
                        <span className="h5">dodaj nowe</span>
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
                                <BrewWizard brew={brewEdited}
                                            submit={(x) => {
                                                BrewService.Edit(x).then(() => setEdited(undefined)).then(() => setLoad(true))
                                            }}
                                            close={() => setEdited(undefined)}
                                            inventory={inventory}/>
                            </>)}

                    </>

                }
                center={
                    <>
                        {extendedBrews.map((x, i) =>
                            (<BrewViewElement brew={x.brew} key={i} usedItems={x.items}
                                              actions={
                                                  <div>
                                                      <button onClick={() => setEdited(x.brew)}
                                                              className="btn btn-info m-1">Edytuj
                                                      </button>
                                                      <button
                                                          onClick={() => setPopup(x.brew)}
                                                          className="btn btn-danger">Usuń
                                                      </button>
                                                  </div>}/>
                            ))}
                    </>
                }
            />

        </>


    )
}