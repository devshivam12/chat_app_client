import React, { Suspense, lazy, useState } from 'react'
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

import { orange } from '../../constants/color'
import { Notifications as NotificationsIcon, Group as GroupIcon, Add as AddIcon, Menu as MenuIcon, Search as SearchIcon, Logout as LogoutIcon } from '@mui/icons-material'

const SearchDialog = lazy(() => import('../specific/Search'))
const NotificationDialog = lazy(() => import('../specific/Notification'))
const NewGroupDialog = lazy(() => import('../specific/NewGroup'))

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExist } from '../../redux/reducres/auth'
import { server } from '../../constants/config'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducres/misc'
import { resetNotificationCount } from '../../redux/reducres/chat'

const Header = () => {

    const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc)
    const { notificationCount } = useSelector((state) => state.chat)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleMobile = () => {
        dispatch(setIsMobile(true))
    };

    const openSearchDialog = () => {
        dispatch(setIsSearch(true))
    }

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true))
    }

    const navigateToGroup = () => {
        navigate('/groups')
    }

    const noticationHandler = () => {
        dispatch(setIsNotification(true))
        dispatch(resetNotificationCount())
    }

    const logouHandler = async () => {
        try {
            const response = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true })
            dispatch(userNotExist())
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={'4rem'}>
                <AppBar position='static'
                    sx={{
                        bgcolor: orange
                    }}
                >
                    <Toolbar>
                        <Typography variant='h5'
                            sx={{
                                display: { xs: 'none', sm: "block" }
                            }} >
                            Chatenger
                        </Typography>

                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                            }}
                        >

                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{
                            flexGrow: 1,
                        }} />


                        <IconBtn
                            title={'Search'}
                            icon={<SearchIcon />}
                            onClick={openSearchDialog}
                        />

                        <IconBtn
                            title={'New Group'}
                            icon={<AddIcon />}
                            onClick={openNewGroup}
                        />

                        <IconBtn
                            title={'Manage Group'}
                            icon={<GroupIcon />}
                            onClick={navigateToGroup}
                        />

                        <IconBtn
                            title={'Notifications'}
                            icon={<NotificationsIcon />}
                            onClick={noticationHandler}
                            value={notificationCount}
                        />

                        <IconBtn
                            title={'Logout'}
                            icon={<LogoutIcon />}
                            onClick={logouHandler}
                        />
                    </Toolbar>
                </AppBar>
            </Box>

            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />}>
                        <SearchDialog />
                    </Suspense>
                )
            }

            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>
                        <NotificationDialog />
                    </Suspense>
                )
            }

            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}>
                        <NewGroupDialog />
                    </Suspense>
                )
            }
        </>
    )
}

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size='large' onClick={onClick}> 
                {
                    value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : icon
                }
            </IconButton>
        </Tooltip>
    )
}

export default Header
