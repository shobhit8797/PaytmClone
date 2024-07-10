import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import Heading from "./Heading";
import ProfileAvatar from "./ProfileAvatar";

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between mt-2">
            <div>
                <ProfileAvatar label={user.firstName[0].toUpperCase()} />
                {user.firstName} {user.lastName}
            </div>

            <div>
                <Button
                    label={"Send Money"}
                    onClick={(e) => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }}
                />
            </div>
        </div>
    );
}

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    // TODO: Add debouncing
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then((response) => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <div className="mt-4 flex flex-col">
            <Heading label={"Users"} />
            <div className="my-2">
                <input
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    type="text"
                    placeholder="Search Users..."
                    className="w-full rounded py-1 px-2 my-2 border border-slate-200"
                />
            </div>
            <div>
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
}
