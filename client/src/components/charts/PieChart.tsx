import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Box,Typography,Stack,useTheme } from '@pankod/refine-mui'
import { PieChartProps } from 'interfaces/home'
const PieChart = ({title,value,series,colors}: PieChartProps) => {
  const theme = useTheme();
  return (
    <Box
    id="chart"
    flex={1}
    display='flex'
    bgcolor={theme.palette.mode === "dark" ? "#0E8388" : "#fcfcfc"}
    flexDirection='row'
    justifyContent='space-between'
    alignItems='center'
    pl={3}
    py={2}
    gap={2}
    borderRadius='15px'
    minHeight='110px'
    width='fit-content'>
      <Stack direction="column">
        <Typography fontSize={14}>
          {title}
        </Typography>
        <Typography fontSize={24} color={theme.palette.mode === "dark" ? "white" :'#11142d'} fontWeight={700} mt={1}>
          {value}
        </Typography>

      </Stack>
        <ReactApexChart
        options={{
          chart: {type:'donut'},
          colors,
          legend:{show:false},
          dataLabels: {enabled:false},
        }}
        series={series}
        type="donut"
        width={120}/>
    </Box>
  )
}

export default PieChart