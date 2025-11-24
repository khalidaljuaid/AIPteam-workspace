'use client'

import {FC, useEffect} from 'react'
import {usePathname} from 'next/navigation'
import clsx from 'clsx'
import {DrawerComponent} from '../../assets/ts/components'
import {WithChildren} from '../../helpers'

const Content: FC<WithChildren> = ({children}) => {
  const location = usePathname()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className={clsx('content flex-row-fluid')}>
      {children}
    </div>
  )
}

export {Content}
