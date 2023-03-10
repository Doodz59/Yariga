import React from 'react'
import {useList} from '@pankod/refine-core'
import { Typography,Box,Stack, useTheme } from '@pankod/refine-mui'
import { PieChart,PropertyReferrals,TotalRevenue,PropertyCard,TopAgent } from 'components'


const Home = () => {
  const theme = useTheme();
  return (
    <Box display='block' flexDirection='column'  >
      <Typography fontSize={25} fontWeight={700} color={theme.palette.mode === "dark" ? "#0E8388" : "#11142D"}>
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap="20px">
        <PieChart
        key='1'
          title="Properties for Sale"
          value={684}
          series={[75,25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart
        key='2'
          title="Properties for Rent"
          value={550}
          series={[60,40]}
          colors={['#475ae8', '#e4e8ef']}
        />
        <PieChart
        key='3'
          title="Total customers"
          value={5684}
          series={[75,25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
        key='4'
          title="Total Cities"
          value={555}
          series={[75,25]}
          colors={['#475be8', '#e4e8ef']}
        />
      </Box>
      <Stack mt='25px' width='100%' gap='20px' direction={{ xs:'column', lg:'row'}} flexGrow={1}>
        <TotalRevenue/>
        <PropertyReferrals/>
      </Stack>
    </Box>
  )
}

export default Home