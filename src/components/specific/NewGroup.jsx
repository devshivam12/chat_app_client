import React, { useState } from 'react'

import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography
} from '@mui/material'


import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'

import { useAsyncMutation, useErrors } from '../hooks/Hook'
import { useInputValidation } from '6pp'
import toast from 'react-hot-toast'
import { setIsNewGroup } from '../../redux/reducres/misc'

const NewGroup = () => {

  const { isNewGroup } = useSelector((state) => state.misc)
  const disaptch = useDispatch()

  const { isError, isLoading, error, data } = useAvailableFriendsQuery()
  
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const groupName = useInputValidation("")

  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [
    {
      isError,
      error,
    }
  ]

  useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };


  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required")

    if (selectedMembers.length < 2) return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group....", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler()
  }

  const closeHandler = () => {
    disaptch(setIsNewGroup(false))
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{
        xs: '1rem',
        sm: '3rem'
      }}
        width={'25rem'}
        spacing={'2rem'}
      >
        <DialogTitle textAlign={'center'} variant='h4' >
          New Group
        </DialogTitle>

        <TextField
          label='Group name'
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant='body1'>
          Members
        </Typography>

        <Stack>
          {
            isLoading ? (
              <Skeleton />
            ) : (
              data?.friends?.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />

              ))
            )
          }
        </Stack>

        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button 
          variant='outlined' 
          color='error' 
            size='large'
            onClick={closeHandler}
          >
            Cancle

          </Button>
          <Button 
          variant='outlined'
          size='large'
          disabled={isLoadingNewGroup}
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
