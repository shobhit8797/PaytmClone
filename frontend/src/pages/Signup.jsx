import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export const Signup = () => {
    return (
        <div className="bg-slate-300 h-screen justify-center flex">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center p-2 px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading
                        label={"Enter your information to create an account"}
                    />
                    <InputBox
                        label={"First Name"}
                        placeholder="Jhon"
                        type="text"
                    />
                    <InputBox
                        label={"Last Name"}
                        placeholder="Doe"
                        type="text"
                    />
                    <InputBox
                        label={"Email"}
                        placeholder="jhondoe@gmail.com"
                        type="email"
                    />
                    <InputBox
                        label={"Password"}
                        placeholder="********"
                        type="password"
                    />
                    <div className="pt-4">
                        <Button label={"Sign Up"} />
                    </div>
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText="Login"
                        to="/signin"
                    />
                </div>
            </div>
        </div>
    );
};
