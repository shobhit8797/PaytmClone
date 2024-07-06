import Heading from "./Heading";
import Button from "./Button";
import ProfileAvatar from "./ProfileAvatar";
import { useNavigate } from "react-router";

function User() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between mt-2">
            <div>
                <ProfileAvatar label={"User"} />
                User 1
            </div>

            <div>
                <Button
                    label={"Send Money"}
                    onClick={(e) => {
                        navigate("/send");
                    }}
                />
            </div>
        </div>
    );
}

export default function Users() {
    return (
        <div className="mt-4 flex flex-col">
            <Heading label={"Users"} />
            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search Users..."
                    className="w-full rounded py-1 px-2 my-2 border border-slate-200"
                />
            </div>
            <User />
        </div>
    );
}
