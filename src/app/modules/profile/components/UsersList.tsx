'use client'

import { FC } from 'react'

type Props = {
    users?: ReadonlyArray<any>
    showAvatar?: boolean
    showText?: boolean
}

const UsersList: FC<Props> = ({ users = [], showAvatar = true, showText = true }) => {
    return <div className="d-flex fw-bold">{users.length} users</div>
}

export { UsersList }
