import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import ProfileAvatar from "../components/ProfileAvatar";

export const SendMoney = () => {
    return (
        <div className="flex justify-center h-screen bg-slate-300">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 h-max text-center p-2 px-4">
                    <Heading label={"Send Money"} />

                    <div className="my-6 w-full justify-start text-start">
                        <div className="mt-6 font-semibold">
                            <ProfileAvatar
                                label={"Feirnd's Name"}
                                color={"bg-green-500"}
                            />
                            Feirnd&apos;s Name
                        </div>
                        <div className="text-sm mt-2">Amount (In Rs)</div>

                        <div>
                            <InputBox
                                placeholder="Enter Amount"
                                type="number"
                            />
                        </div>

                        <div className="w-full mt-2">
                            <Button
                                label={"Initiate Transfer"}
                                color={"bg-green-500"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
