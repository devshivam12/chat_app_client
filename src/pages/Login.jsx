import axios from 'axios';
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { bgGradient } from '../constants/color';
import { server } from '../constants/config';
import { userExists, userNotExist } from '../redux/reducres/auth';

const VisuallyHiddenInput = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const Login = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleLogin = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading('Logging in...');

    try {
      const config = {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await axios.post(`${server}/api/v1/user/login`, data, config);
      dispatch(userExists(response.data.user));
      toast.success(response.data.message, { id: toastId });
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong', { id: toastId });
      dispatch(userNotExist(true));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading('Signing up...');

    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('bio', data.bio);
    formData.append('password', data.password);

    try {
      const config = {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const response = await axios.post(`${server}/api/v1/user/new`, formData, config);
      dispatch(userExists(response.data.user));
      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      dispatch(userNotExist(true));
      toast.error(error?.response?.data?.message || 'Something went wrong', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(data);
    } else {
      handleSignup(data);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleLogin = () => setIsLogin((prev) => !prev);

  return (
    <Box
      sx={{
        backgroundImage: bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {isLogin ? 'Login' : 'Sign up'}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: '100%',
            }}
          >
            {!isLogin && (
              <Stack
                position="relative"
                width="10rem"
                margin="auto"
                sx={{ mb: 2 }}
              >
                <Avatar
                  sx={{
                    width: '10rem',
                    height: '10rem',
                    objectFit: 'contain',
                  }}
                  src={avatarPreview}
                />
                <IconButton
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    height: '2rem',
                    width: '2rem',
                    bottom: '0',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    ':hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                    right: '0',
                  }}
                  component="label"
                >
                  <CameraAltIcon />
                  <VisuallyHiddenInput
                    type="file"
                    {...register('avatar')}
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Stack>
            )}
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                type="text"
                variant="outlined"
                {...register('name', { required: true })}
                error={!!errors.name}
                helperText={errors.name ? 'Name is required' : ''}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              type="text"
              variant="outlined"
              {...register('username', { required: true })}
              error={!!errors.username}
              helperText={errors.username ? 'Username is required' : ''}
            />
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Bio"
                name="bio"
                type="text"
                variant="outlined"
                {...register('bio', { required: true })}
                error={!!errors.bio}
                helperText={errors.bio ? 'Bio is required' : ''}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password ? 'Password is required' : ''}
            />
            <Button
              type="submit"
              sx={{
                marginTop: '1rem',
                padding: '0.75rem',
                fontSize: '1rem',
              }}
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLogin ? 'Login' : 'Sign up'}
            </Button>
            <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
              OR
            </Typography>
            <Button
              variant="text"
              fullWidth
              onClick={toggleLogin}
              disabled={isLoading}
              sx={{ fontSize: '0.9rem' }}
            >
              {isLogin ? 'Sign Up Instead' : 'Login Instead'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
