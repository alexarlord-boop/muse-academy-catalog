import {AssetIsAbsent} from "../icons/AssetIsAbsent.jsx";
import React from "react";


export default function PreviewImage({image_url = null}) {
    const exist = image_url && image_url.length > 0;

    return (
        <div className="w-full md:w-1/2 px-4 flex ">
            {
                exist ? (
                    <img
                        src={image_url}
                        alt="Image cover"
                        className="object-cover rounded-xl shadow-lg max-h-screen"
                    />
                ) : (
                    <AssetIsAbsent/>
                )
            }
        </div>
    );
}
