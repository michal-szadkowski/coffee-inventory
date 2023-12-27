export default function DateTimePicker({ value, onChange }: { value: Date, onChange: (arg: Date) => void }) {
    return (
        <div className="input-group">
            <input className="form-control" type="date"
                value={value?.toISOString().slice(0, 10) || ""}
                onChange={(e) => {
                    let newDate = new Date(value);
                    if (e.target.valueAsDate !== null) {
                        newDate.setFullYear(e.target.valueAsDate.getFullYear(), e.target.valueAsDate.getMonth(), e.target.valueAsDate.getDate());
                    }
                    onChange(newDate)
                }} />

            <input className="form-control" type="time"
                value={value.toTimeString().slice(0, 5)}
                onChange={(e) => {
                    let newDate = new Date(value);
                    if (e.target.valueAsDate !== null) {
                        newDate.setHours(e.target.valueAsDate.getUTCHours(), e.target.valueAsDate.getMinutes(), 0);
                    }
                    onChange(newDate);
                }} />
        </div>
    )
}