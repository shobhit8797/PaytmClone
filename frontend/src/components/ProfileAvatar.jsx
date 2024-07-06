export default function ProfileAvatar({ label }) {
    return (
        <span className="w-12 h-12 rounded-full border px-2 py-2 justify-center mt-1 mx-2 bg-slate-200 text-slate-800">
            {label[0]}
        </span>
    );
}
