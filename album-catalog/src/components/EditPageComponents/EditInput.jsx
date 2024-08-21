import {Input} from "@nextui-org/input";
import React from "react";


export default function EditInput({hidden, size = "md", name, type, value, onChange}) {
    let sizeClass = "w-1/2";
    switch (size) {
        case "sm":
            sizeClass = "w-1/3";
            break;
        case "md":
            sizeClass = "w-1/2";
            break;
        case "lg":
            sizeClass = "w-full";
            break;
        default:
            sizeClass = "w-1/2";
    }
    return (
        <Input
            hidden={hidden}
            name={name}
            type={type}
            placeholder={`Enter album ${type}`}
            value={value}
            onChange={onChange}
            className={"text-6xl font-bold border-black border-dashed border-1 rounded-xl " + sizeClass}
        />
    );
}