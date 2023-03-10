import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Box,Typography,Stack, useTheme } from '@pankod/refine-mui'
import { ArrowCircleUpRounded } from '@mui/icons-material'
import { TotalRevenueOptions,TotalRevenueSeries } from './chart.config'

const TotalRevenue = () => {
  const theme = useTheme();
  return (
    <Box p={4} flex={1} bgcolor={theme.palette.mode === "dark" ? "#0E8388" : "#fcfcfc"} id="chart" display="flex" flexDirection="column" borderRadius='15px'  >
      <Typography fontSize={18} fontWeight={600} color={theme.palette.mode === "dark" ? "white" : "#11142d"}>
        Total Revenue
      </Typography>
<Stack  my='20px' display='flex' flexDirection="row" gap={4} flexWrap='wrap'>
  <Typography fontSize={28} fontWeight={700} color={theme.palette.mode === "dark" ? "white" :"#11142d"}>
    $236,535
  </Typography>
  <Stack flexDirection='row' alignItems='center' gap={1}>
    <ArrowCircleUpRounded sx={{
      fontSize: 25, color:theme.palette.mode === "dark" ? "white" : '#475be8'
    }}/>
    <Stack>
      <Typography fontSize={15} color={theme.palette.mode === "dark" ? "white" :"#475be8"}>
        0.8%
      </Typography>
      <Typography fontSize={12} color={theme.palette.mode === "dark" ? "white" :"#808191"}>
        Than last month
      </Typography>
    </Stack>
  </Stack>
</Stack>
<ReactApexChart
series={TotalRevenueSeries}
type='bar'
height={310}
options={TotalRevenueOptions}
display='flex'/>
    </Box>
  )
}

export default TotalRevenue