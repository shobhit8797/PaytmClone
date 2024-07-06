import Heading from "../components/Heading";
import ProfileAvatar from "../components/ProfileAvatar";
import Users from "../components/Users";

export const Dashboard = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between py-4 px-4 border-b-2 border-grey-300">
                    <div className="bg-grey-800 font-bold"> Payments App </div>
                    <div className="justify-center">
                        Hello User
                        <ProfileAvatar label={"User"} />
                    </div>
                </div>

                <div className="pt-4 px-4">
                    {/* Balance Section */}
                    <div className="font-bold my-4">
                        Your Balance{" "}
                        <span className="pl-2 font-normal">$5000</span>
                    </div>

                    <Users />
                </div>
            </div>
        </>
    );
};
