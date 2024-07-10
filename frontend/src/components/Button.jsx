export default function Button({ label, onClick, color }) {
    const bgColor = color || "bg-slate-800";
    const hoverBgColor = color ? "hover:bg-green-600" : "hover:bg-slate-900";
    // const textColor = color ? "text-white" : "text-slate-800";
    return (
        <button
            onClick={onClick}
            type="button"
            className={`w-full text-white focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${bgColor} ${hoverBgColor}`}
        >
            {label}
        </button>
    );
}
