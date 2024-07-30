import {TbWorldQuestion} from "react-icons/tb";
import React from "react";

export const AssetIsAbsent = ({
                                  size = 128, className = "mx-auto", ...props
                              }) => (
    <TbWorldQuestion size={size} className={className} {...props}/>
);