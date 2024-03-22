'use client'

import { Box } from '@mui/material'
import React, { useEffect } from 'react'

import NewTableForm from '@/components/NewTableForm';

import { UseStyleForm } from '../styles'
import { useRouter } from 'next/navigation'

export default function EditTable() {
  const router = useRouter()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userObj')) || {};
    if (!user.access_token || (user.role_name !== 'owner' && user.role_name !== 'manager')) {
      router?.push('/admin/login');
    }
  }, []);
  const classes = UseStyleForm()
  return (
    <Box className={classes.mainContainer}>
      <NewTableForm title="Edit Table" />
    </Box>
  )
}
