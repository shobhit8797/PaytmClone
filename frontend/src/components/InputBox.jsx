export default function InputBox({
    type,
    placeholder,
    value,
    onChange,
    label,
}) {
    return (
        <div className="font-medium text-left">
            {label}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded-lg p-2 w-full my-2"
            />
        </div>
    );
}
