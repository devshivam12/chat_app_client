import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import { setIsSearch } from '../../redux/reducres/misc'
import { useAsyncMutation } from '../hooks/Hook'
import UserItem from '../shared/UserItem'

const users = [1, 2, 3]

const Search = () => {

  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const { isSearch } = useSelector((state) => state.misc)
  const [searchUser] = useLazySearchUserQuery()


  const [sendFriendRequest, isLoadingSendFriend] = useAsyncMutation(useSendFriendRequestMutation)

  const dispatch = useDispatch()


  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUser(search)
        .then(({ data }) => setUsers(data.users))
    }, 800)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])


  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id })
  }


  const handleSearchClose = () => dispatch(setIsSearch(false))

  return (
    <Dialog open={isSearch} onClose={handleSearchClose}>
      <Stack
        p={'2rem'}
        direction={'column'}
        width={'25rem'}
      >
        <DialogTitle textAlign={'center'}>
          Find People
        </DialogTitle>

        <TextField
          variant='outlined'
          value={search}
          onChange={handleSearchChange}
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <List>
          {
            users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriend} />
            ))
          }
        </List>

      </Stack>
    </Dialog>
  )
}

export default Search
