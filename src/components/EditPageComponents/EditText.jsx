import {Textarea} from "@nextui-org/input";
import React from "react";


export default function EditText({name, value, onChange}) {
    const title = name.split("_").join(' ');
    return (
        <Textarea
            label={title}
            maxRows={6}
            name={name}
            labelPlacement="inside"
            placeholder={"Enter " + title}
            value={value}
            onChange={onChange}
            className="border-black border-dashed border-1 rounded-xl"
        />
    );
}