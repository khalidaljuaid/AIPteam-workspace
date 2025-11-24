'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeModeComponent } from '../../../assets/ts/layout'
import { toAbsoluteUrl } from '../../../helpers'

export type ThemeModeType = 'dark' | 'light' | 'system'
export const themeModelSKey = 'kt_theme_mode_value'
export const themeMenuModeLSKey = 'kt_theme_mode_menu'

const getSystemMode = () => {
  if (typeof window === 'undefined') return 'light'
  return ThemeModeComponent.getSystemMode() as 'light' | 'dark'
}

type ThemeModeContextType = {
  mode: ThemeModeType
  menuMode: ThemeModeType
  updateMode: (_mode: ThemeModeType) => void
  updateMenuMode: (_mode: ThemeModeType) => void
}

const themeModeSwitchHelper = (_mode: ThemeModeType) => {
  // change background image url
  const mode = _mode !== 'system' ? _mode : getSystemMode()
  const imageUrl = '/media/patterns/header-bg' + (mode === 'light' ? '.jpg' : '-dark.png')
  document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`
}

const getThemeModeFromLocalStorage = (lsKey: string): ThemeModeType => {
  if (typeof window === 'undefined' || !localStorage) {
    return 'system'
  }

  const data = localStorage.getItem(lsKey)
  if (data === 'dark' || data === 'light' || data === 'system') {
    return data
  }

  if (document.documentElement.hasAttribute('data-bs-theme')) {
    const dataTheme = document.documentElement.getAttribute('data-bs-theme')
    if (dataTheme && (dataTheme === 'dark' || dataTheme === 'light' || dataTheme === 'system')) {
      return dataTheme
    }
  }

  return 'system'
}

const defaultThemeMode: ThemeModeContextType = {
  mode: 'system',
  menuMode: 'system',
  updateMode: (_mode: ThemeModeType) => { },
  updateMenuMode: (_menuMode: ThemeModeType) => { },
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'system',
  menuMode: 'system',
  updateMode: (_mode: ThemeModeType) => { },
  updateMenuMode: (_menuMode: ThemeModeType) => { },
})

const useThemeMode = () => useContext(ThemeModeContext)

const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeType>('system')
  const [menuMode, setMenuMode] = useState<ThemeModeType>('system')

  // Load from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMode = getThemeModeFromLocalStorage(themeModelSKey)
      const storedMenuMode = getThemeModeFromLocalStorage(themeMenuModeLSKey)
      setMode(storedMode)
      setMenuMode(storedMenuMode)
    }
  }, [])

  const updateMode = (_mode: ThemeModeType, saveInLocalStorage: boolean = true) => {
    setMode(_mode)
    // themeModeSwitchHelper(updatedMode)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeModelSKey, _mode)
    }

    if (saveInLocalStorage) {
      const updatedMode = _mode === 'system' ? getSystemMode() : _mode
      document.documentElement.setAttribute('data-bs-theme', updatedMode)
    }
    ThemeModeComponent.init()
  }

  const updateMenuMode = (_menuMode: ThemeModeType, saveInLocalStorage: boolean = true) => {
    setMenuMode(_menuMode)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeMenuModeLSKey, _menuMode)
    }
  }

  useEffect(() => {
    updateMode(mode, false)
    updateMenuMode(menuMode, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeModeContext.Provider value={{ mode, menuMode, updateMode, updateMenuMode }}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export { ThemeModeProvider, useThemeMode, getSystemMode, themeModeSwitchHelper }
