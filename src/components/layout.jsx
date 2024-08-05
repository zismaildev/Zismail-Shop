import React from 'react'
import NavbarComp from './navbar'
import FooterComp from './footer'

export default function Layout({ children }) {
    return (
        <div>
            <NavbarComp />
            {children}
            <FooterComp />
        </div>
    )
}
