import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { transformImage } from '../../libs/feature'

const UserItem = ({
    user,
    handler,
    handlerIsLoading,
    isAdded = false,
    // styling = {}
}) => {

    const { name, _id, avatar } = user
    return (

        <ListItem>
            <Stack
                alignItems={'center'}
                spacing={'1rem'}
                width={'100%'}
                direction={'row'}>
                {/* sx={styling} */}
                <Avatar src={transformImage(avatar)} />

                <Typography
                    variant='body1'
                    sx={{
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'eclipsis',
                        width: '100%'
                    }}
                >
                    {name}
                </Typography>

                <IconButton
                    size='small'
                    sx={{
                        bgcolor: isAdded ? 'error.main' : 'primary.main',
                        color: 'white',
                        "&:hover": {
                            bgcolor: isAdded ? 'error.dark' : 'primary.main'
                        }
                    }}
                    onClick={() => handler(_id)} 
                    disabled={handlerIsLoading}>

                    {
                        isAdded ? <RemoveIcon /> : <AddIcon />
                    }

                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem)
