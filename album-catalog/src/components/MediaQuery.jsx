import {useEffect, useState} from "react";

const viewports = {
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
}

const MediaQuery = ({ ssr = false, min, max, children }) => {
    const [shouldShow, setShouldShow] = useState(ssr)

    useEffect(() => {
        const listener = () => {
            const shouldShow = window.innerWidth >= (viewports[min] || 0) && window.innerWidth <= (viewports[max] || Infinity)

            setShouldShow(shouldShow)
        }

        listener()

        window.addEventListener("resize", listener)
        window.addEventListener("orientationchange", listener)

        return () => {
            window.removeEventListener("resize", listener)
            window.removeEventListener("orientationchange", listener)
        }
    }, [])

    if(!shouldShow) return null

    return children
}

export default MediaQuery