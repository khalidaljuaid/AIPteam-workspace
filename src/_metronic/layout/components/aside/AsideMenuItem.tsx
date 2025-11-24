import {FC} from 'react'
import clsx from 'clsx'
import {default as Link} from 'next/link'
import {usePathname} from 'next/navigation'
import {checkIsActive, KTIcon, WithChildren} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  href: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  href,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const pathname = usePathname()
  const isActive = checkIsActive(pathname, href)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', {active: isActive})} href={href}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
