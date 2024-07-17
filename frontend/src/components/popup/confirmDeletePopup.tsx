import './popup.scss'

export default function ConfirmDeletePopup({children, isOpen, onAccept, onClose}: {
    children?: React.ReactNode,
    isOpen: boolean,
    onAccept: () => void,
    onClose: () => void
}) {

    if (isOpen)
        return <div className="popup" onClick={(e) => {
            onClose()
        }}>
            <div className="popup-inner d-flex flex-column col-lg-4 col-11" onClick={(e) => {
                e.stopPropagation()
            }}>
                <h5>
                    {children}
                </h5>
                <div className=" mt-3 row justify-content-around">
                    <button className="col-4 btn btn-danger  " onClick={() => onAccept()}>Usuń</button>
                    <button className="col-4 btn btn-warning py-lg-1 py-2" onClick={() => onClose()}>Anuluj
                    </button>
                </div>


            </div>
        </div>;
    else return <></>
}               