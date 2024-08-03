import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import {useState} from "react";
import ConfirmDeletePopup from "../popup/confirmDeletePopup";
import {InventoryService} from "../../services/inventoryService";
import {InventoryViewItem} from "./inventoryViewItem";

export default function ItemsList({inventory, reload, select}: {
    inventory: InventoryItemDTO[],
    reload: () => void,
    select: (arg: InventoryItemDTO) => void
}) {

    let [popup, setPopup] = useState<InventoryItemDTO | null>(null);

    function AcceptDelete() {
        if (popup != null)
            InventoryService.Delete(popup.id).then(x => reload());
        setPopup(null)
    }

    return < >
        <ConfirmDeletePopup
            isOpen={popup != null}
            onAccept={() => AcceptDelete()}
            onClose={() => setPopup(null)}
        >
            Czy na pewno chcesz usunąć?
        </ConfirmDeletePopup>

        {inventory.map((x, i) =>
            (<InventoryViewItem item={x} key={i} actions={
                    <div>
                        <button onClick={() => select(x)} className="btn btn-info m-1">Edytuj</button>
                        <button onClick={() => setPopup(x)}
                                className="btn btn-danger">
                            Usuń
                        </button>
                    </div>}/>
            ))}
    </>


}