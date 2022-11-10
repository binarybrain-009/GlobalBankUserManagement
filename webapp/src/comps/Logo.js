import React from "react";
import { Globe } from "react-feather"

const Logo = (props) => {
    return (
        <>
            <div className={`logo-main color-${props.color || ''}`}>
                <Globe color={`${props.color || ''}`} />
                <h3 >Global Bank</h3>
            </div>
        </>
    )
}

export default Logo;