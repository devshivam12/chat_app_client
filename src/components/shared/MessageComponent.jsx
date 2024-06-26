import React, { memo } from 'react'
import moment from 'moment'
import { Box, Typography } from '@mui/material'
import { lightBlue } from '../../constants/color'
import { fileFormat } from '../../libs/feature'
import RenderAttachment from './RenderAttachment'
import { motion } from 'framer-motion'

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message

    const sameSender = sender?._id === user?._id

    const timeAgo = moment(createdAt).fromNow()

    return (
        <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{opacity : 1, x : 0}}
            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: 'white',
                color: 'black',
                padding: '0.5rem',
                width: 'fit-content',
                borderRadius: '5px'
            }}
        >
            {
                !sameSender && (
                    <Typography color={lightBlue}
                        fontWeight={"600"} variant='caption'
                    >
                        {sender.name}
                    </Typography>
                )
            }

            {
                content && <Typography>{content}</Typography>
            }

            {attachments.length > 0 &&
                attachments.map((attachment, index) => {
                    const url = attachment.url;
                    const file = fileFormat(url);

                    return (
                        <Box key={index}>
                            <a
                                target='_blank'
                                download
                                style={{
                                    color: 'black'
                                }}
                                href={url}
                            >
                                {RenderAttachment(file, url)}
                            </a>
                        </Box>
                    )
                })
            }

            <Typography
                color={"text.secondary"}
                variant='caption'>
                {
                    timeAgo
                }
            </Typography>
        </motion.div>
    )
}

export default memo(MessageComponent)
