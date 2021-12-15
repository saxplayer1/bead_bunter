import React from "react";
import { Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
    return(
        <div className={"header"}>
            <ul className={"header-list"}>
                <li>
                    <div className={"link-box"}>
                        <Link to={"/"} className={"header-item"}>
                            HOME
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={"link-box"}>
                        <Link to={"/jobs"}  className={"header-item"}>
                            JOBS
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={"link-box"}>
                        <Link to={"/applicants"} className={"header-item"}>
                            APPLICANTS
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={"link-box"}>
                        <Link to={"/employers"} className={"header-item"}>
                            EMPLOYERS
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}