import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import {
    Face as FaceIcon,
    CalendarMonth as CalendarIcon,
    AlternateEmail as UserNameIcon
} from '@mui/icons-material'

import moment from 'moment'
import { transformImage } from '../../libs/feature'


const Profile = ({ user }) => {
    return (
        <Stack spacing={3} direction={'column'} alignItems={'center'}>
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: 'contain',
                    marginBottom: '1rem',
                    border: '5px solid white'
                }} />

            <ProfileCard
                heading={"Bio"}
                text={user?.bio}
            />

            <ProfileCard
                heading={"Username"}
                text={user?.username}
                Icon={<UserNameIcon />}
            />

            <ProfileCard
                heading={"Name"}
                text={user?.name}
                Icon={<FaceIcon />}
            />

            <ProfileCard
                heading={"Joined"}
                text={moment(user?.createdAt).fromNow()}
                Icon={<CalendarIcon />}
            />

        </Stack>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        alignItems={'center'}
        spacing={2}
        color={'white'}
        textAlign={'center'}
        direction={'row'}>

        {
            Icon && Icon
        }

        <Stack>
            <Typography variant='body'>
                {text}
            </Typography>
            <Typography
                variant="caption"
                color={'grey'}
            >
                {heading}
            </Typography>
        </Stack>

    </Stack>
)

export default Profile
