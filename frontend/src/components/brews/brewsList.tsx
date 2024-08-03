import {BrewViewElement} from "./brewViewElement";
import {BrewService} from "../../services/brewsService";
import {useState} from "react";
import BrewDTO from "../../services/entities/brewDTO";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import ConfirmDeletePopup from "../popup/confirmDeletePopup";

export default function BrewsList({brews, inventory, select, reload}: {
    brews: BrewDTO[],
    inventory: InventoryItemDTO[],
    select: (brew: BrewDTO) => void
    reload: () => void
}) {

    let [popup, setPopup] = useState<BrewDTO | null>(null);

    function AcceptDelete() {
        if (popup != null)
            BrewService.Delete(popup.id).then(() => reload())
        setPopup(null)
    }

    const extendedBrews = brews.map(x => ({
        brew: x,
        items: inventory.filter(y => x.usage.map(z => z.itemId).includes(y.id))
    }))

    return (<>
            <ConfirmDeletePopup
                isOpen={popup != null}
                onAccept={() => AcceptDelete()}
                onClose={() => setPopup(null)}
            >
                Czy na pewno chcesz usunąć?
            </ConfirmDeletePopup>
            {extendedBrews.map((x, i) =>
                (<BrewViewElement brew={x.brew} key={i} usedItems={x.items}
                                  actions={
                                      <div>
                                          <button onClick={() => select(x.brew)}
                                                  className="btn btn-info m-1">Edytuj
                                          </button>
                                          <button
                                              onClick={() => setPopup(x.brew)}
                                              className="btn btn-danger">Usuń
                                          </button>
                                      </div>}/>
                ))}
        </>
    )
}