import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { orange, matBlack, bgGradient } from '../constants/color'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon, Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats, sampleUsers } from '../constants/SampleData'
import UserItem from '../components/shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../components/hooks/Hook'
import { setIsAddMember } from '../redux/reducres/misc'
import { LayoutLoader } from '../components/layout/Loader'
import { Link } from '../components/style/StyleComponent'

const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'))


const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'))



const Groups = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const chatId = useSearchParams()[0].get('group')
  console.log(chatId)

  const { isAddMember } = useSelector((state) => state.misc)
  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  )

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)

  const [isMobileOpen, setIsMoblieOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error
    },
    {
      isError: groupDetails.isErrorerror,
      error: groupDetails.error,
    }
  ]

  useErrors(errors)

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setMembers([])
      setIsEdit(false)
    };
  }, [groupDetails.data])

  const navigateBack = () => {
    navigate('/')
  }

  const handleMobile = () => {
    setIsMoblieOpen((prev) => !prev)
  }

  const handleMobileClose = () => {
    setIsMoblieOpen(false)
  }

  const updateGroupName = () => {
    setIsEdit(false)
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue
    })
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId)
    closeConfirmDeleteHandler()
    navigate("/groups")
  }

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member....", { chatId, userId })
  }

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }
  }, [chatId])

  const IconBtn = <>

    <Box
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
        position: "fixed",
        right: '1rem',
        top: "1rem"
      }}>

      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>

    <Tooltip title="back">
      <IconButton
        sx={{
          position: "absolute",
          top: '2rem',
          left: "2rem",
          color: "white",
          bgcolor: matBlack,
          ":hover": {
            bgcolor: "rgba(0,0,0,0.7)",
          }
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>

  const GroupName = (

    <Stack
      alignItems={'center'}
      spacing={'1rem'}
      justifyContent={'center'}
      padding={'3rem'}
      direction={'row'}>
      {
        isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton
              onClick={updateGroupName}
              disabled={isLoadingGroupName}
            >
              <DoneIcon />
            </IconButton>

          </>
        ) : (
          <>
            <Typography variant='h4'>
              {groupName}
            </Typography>

            <IconButton
              disabled={isLoadingGroupName}
              onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )
      }
    </Stack>


  )
  const ButtonGroup =
    (
      <Stack
        direction={{
          sm: "row",
          xs: "column-reverse"
        }}
        spacing={'1rem'}
        p={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem"
        }}
      >
        <Button
          color='error'
          variant='outlined'
          startIcon={<DeleteIcon />}
          size='large'
          onClick={openConfirmDeleteHandler}
        >

          Delete Group

        </Button>

        <Button
          size='large'
          startIcon={<AddIcon />}
          variant='contained'
          onClick={openAddMemberHandler}
        >
          Add Memeber

        </Button>
      </Stack>
    )

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid
      container
      height={'100vh'}
    >
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: "block"
          },

        }}
        sm={4}

      >
        <GroupsList
          myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: "column",
          position: "relative",
          alignItems: 'center',
          padding: '1rem 3rem'
        }}
      >
        {IconBtn}

        {
          groupName && (
            <>

              {GroupName}

              <Typography
                margin={'2rem'}
                alignSelf={'flex-start'}
                variant='body1'
              >
                Members
              </Typography>

              <Stack
                maxWidth={'45rem'}
                width={'100%'}
                boxSizing={"border-box"}
                padding={{
                  sm: '1rem',
                  xs: '0',
                  md: '1rem 4rem'
                }}

                spacing={"2rem"}
                height={'50vh'}
                overflow={'auto'}
              >

                {
                  isLoadingRemoveMember ? (
                    <CircularProgress />
                  ) : (
                    members.map((i) => (
                      <UserItem
                        key={i._id}
                        user={i}
                        isAdded
                        styling={{
                          boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                          padding: '1rem 2rem',
                          borderRadius: '1rem',
                        }}
                        handler={removeMemberHandler}

                      />
                    ))
                  )
                }

              </Stack>

              {ButtonGroup}
            </>
          )

        }
      </Grid>

      {
        isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )
      }

      {
        confirmDeleteDialog && (
          <Suspense
            fallback={<Backdrop open />}
          >
            <ConfirmDeleteDialog
              handleClose={closeConfirmDeleteHandler}
              open={confirmDeleteDialog}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )
      }


      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none"
          }
        }}
        onClose={handleMobileClose}
        open={isMobileOpen} >
        <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  )
}


const GroupsList = ({ w = "100%", myGroups = [], chatId }) =>
(
  <Stack
    width={w}
    padding={"2rem"}
    sx={{
      backgroundImage: bgGradient,
      height: '100vh',
      overflow: 'auto'
    }}
  >
    {
      myGroups.length > 0 ? (
        myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
      ) : (
        <Typography textAlign={"center"} padding="1rem">
          No groups
        </Typography>
      )
    }
  </Stack>
);


const GroupListItem = memo(({ group, chatId }) => {
  const {
    name, avatar, _id
  } = group

  return (
    <Link to={`?group=${_id}`}
      onClick={e => {
        if (chatId === _id) e.preventDefault()
      }}
    >
      <Stack direction={"row"}
        spacing={'1rem'}
        alignItems={'center'}
      >
        <AvatarCard avatar={avatar} />
        <Typography style={{
          color : "black",
          fontSize : "1.5rem",
          marginLeft : "1rem"
        }}>
          {name}
        </Typography>
      </Stack>
    </Link>
  )
})

export default Groups
