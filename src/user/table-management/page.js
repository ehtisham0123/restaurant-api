'use client'

import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react';

import Tables from '@/components/Tables';
import TablesStatus from '@/components/TablesStatus';
import { UseStyleTableManagement } from './styles'
import { useRouter } from 'next/navigation'
import { getRestaurantTable } from '@/utils/admin';

export default function TableManagement() {
  const [restaurantTables, setRestaurantTables] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userObj')) || {};
    if (!user.access_token || (user.role_name !== 'owner' && user.role_name !== 'manager')) {
      router?.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    const fetchRestaurantTable = async () => {
      try {
        const response = await getRestaurantTable(router);
        if (response?.data) {
          setRestaurantTables(response?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurantTable();
  }, []);

  const classes = UseStyleTableManagement()

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.subContainer}>
        <TablesStatus />
        <Tables TableDetails={restaurantTables} />
      </Box>
    </Box>
  )
}