import React from 'react'
import { Place } from '@mui/icons-material'
import { Link } from '@pankod/refine-react-router-v6'
import { Typography, Box, Card, CardMedia, CardContent, Stack, useTheme } from '@pankod/refine-mui'
import { PropertyCardProps } from 'interfaces/property'

const PropertyCard = ({title, location, price, photo, id}:PropertyCardProps) => {
  const theme = useTheme();

  return (
    <Card component={Link} to={`/properties/show/${id}`}
    sx={{maxWidth:'330px', padding:'10px', '&:hover':{
      boxShadow: '0 22px 45px 2px rgba(176,176,176, 0.1)',
    },
    cursor:"pointer",
   }}
    elevation={0}>
      <CardMedia 
      component="img"
      width="100%"
      height={210}
      image={photo}
      alt="card image"
      sx={{borderRadius:"10px"}}
      /> 
      <CardContent sx={{ display:'flex', flexDirection:'row', gap:'10px', justifyContent:'space-between', paddingX:'5px'}}>
        <Stack 
        direction='column' gap={1}
        >
<Typography fontSize={16} fontWeight={500} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>  {title}</Typography>
<Stack direction='row' gap={0.5} alignItems="flex-start">
  <Place sx={{ fontSize:18, color:theme.palette.mode === "dark" ? "white" :'#11142d', marginTop:0.5}}/>
  <Typography fontSize={14} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>{location}</Typography>
   </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor={theme.palette.mode === "dark" ? "#0E8388" : "#dadefa"} height='fit-content' >
          <Typography fontSize={12} fontWeight={600} color={theme.palette.mode === "dark" ? "white" :'#11142d'} >${price}</Typography>
        </Box>
        </CardContent>     
    </Card>
  )
}

export default PropertyCard