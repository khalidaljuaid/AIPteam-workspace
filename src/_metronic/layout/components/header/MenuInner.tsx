import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} href='/dashboard' />
      <MenuItem title='Layout Builder' href='/builder' />
      <MenuInnerWithSub
        title='Crafted'
        href='/crafted'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        {/* PAGES */}
        <MenuInnerWithSub
          title='Pages'
          href='/crafted/pages'
          icon='element-plus'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title='Profile'
            href='/crafted/pages/profile'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem href='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
            <MenuItem href='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
            <MenuItem href='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
            <MenuItem href='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
            <MenuItem
              href='/crafted/pages/profile/connections'
              title='Connections'
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title='Wizards'
            href='/crafted/pages/wizards'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem href='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet={true} />
            <MenuItem href='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
          </MenuInnerWithSub>
        </MenuInnerWithSub>

        {/* ACCOUNT */}
        <MenuInnerWithSub
          title='Accounts'
          href='/crafted/accounts'
          icon='profile-circle'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem href='/crafted/account/overview' title='Overview' hasBullet={true} />
          <MenuItem href='/crafted/account/settings' title='Settings' hasBullet={true} />
        </MenuInnerWithSub>

        {/* ERRORS */}
        <MenuInnerWithSub
          title='Errors'
          href='/error'
          icon='fingerprint-scanning'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem href='/error/404' title='Error 404' hasBullet={true} />
          <MenuItem href='/error/500' title='Error 500' hasBullet={true} />
        </MenuInnerWithSub>

        {/* Widgets */}
        <MenuInnerWithSub
          title='Widgets'
          href='/crafted/widgets'
          icon='element-11'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem href='/crafted/widgets/lists' title='Lists' hasBullet={true} />
          <MenuItem href='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
          <MenuItem href='/crafted/widgets/charts' title='Charts' hasBullet={true} />
          <MenuItem href='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
          <MenuItem href='/crafted/widgets/tables' title='Tables' hasBullet={true} />
          <MenuItem href='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub title='Apps' href='/apps' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuInnerWithSub
          title='Chat'
          href='/apps/chat'
          icon='message-text-2'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem href='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
          <MenuItem href='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
          <MenuItem href='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
        </MenuInnerWithSub>
        <MenuItem icon='shield-tick' href='/apps/user-management/users' title='User management' />
      </MenuInnerWithSub>
      <MenuInnerWithSub
        isMega={true}
        title='Mega menu'
        href='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub>
    </>
  )
}
