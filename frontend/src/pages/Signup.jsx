import axios from "axios";
import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="bg-slate-300 h-screen justify-center flex">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center p-2 px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading
                        label={"Enter your information to create an account"}
                    />
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        label={"First Name"}
                        placeholder="Jhon"
                        type="text"
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        label={"Last Name"}
                        placeholder="Doe"
                        type="text"
                    />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        label={"Email"}
                        placeholder="jhondoe@gmail.com"
                        type="email"
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        label={"Password"}
                        placeholder="********"
                        type="password"
                    />
                    <div className="pt-4">
                        <Button
                            onClick={async () => {
                                const response = await axios.post(
                                    "http://localhost:3000/api/v1/user/signup",
                                    {
                                        firstName,
                                        lastName,
                                        username,
                                        password,
                                    }
                                );
                                localStorage.setItem(
                                    "token",
                                    response.data.token
                                );
                            }}
                            label={"Sign Up"}
                        />
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
