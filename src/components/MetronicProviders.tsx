'use client'

import { FC, ReactNode } from 'react'
import { ThemeModeProvider } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { MasterInit } from '@/_metronic/layout/MasterInit'

export const MetronicProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeModeProvider>
            {children}
            <MasterInit />
        </ThemeModeProvider>
    )
}
