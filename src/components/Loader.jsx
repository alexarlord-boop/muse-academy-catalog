import React from "react";
import {Spinner} from "@nextui-org/react";


export default function Loader(props) {
    return (<div className="container h-[90dvh] flex items-center justify-center">
        <Spinner size="lg" color="danger" labelColor="foreground" className=""/>
    </div>);
}