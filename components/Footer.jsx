import React from "react"

export default function Footer() {
    const today = new Date()
    return (
        <footer>&#169; {today.getFullYear()} #VANLIFE</footer>
    )
}