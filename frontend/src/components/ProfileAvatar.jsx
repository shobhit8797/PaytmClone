export default function ProfileAvatar({ label, color }) {
    const bgColor = color || "bg-slate-200";
    const textColor = color ? "text-white" : "text-slate-800";
    return (
        <span
            className={`w-12 h-12 rounded-full border px-2 py-2 justify-center mt-1 mx-2 ${textColor} ${bgColor}`}
        >
            {label[0]}
        </span>
    );
}
