/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { Typography, Box, Stack, maxWidth, useTheme} from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
    Star,
} from "@mui/icons-material";
import Mapgoogle from 'components/Map/map';
import { CustomButton } from "components";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const PropertyDetails = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();
    const [value, setValue] = useState(new Date());
    const handleDateChange = (value: string | Date): void => {
        
        setValue(prevValue => {
          const newValue = typeof value === "string" ? new Date(value) : value;
          return newValue;
        });
      };
    
    const { data, isLoading, isError } = queryResult;

    const propertyDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === propertyDetails.creator.email;

    const handleDeleteProperty = () => {
        const response = confirm(
            "Are you sure you want to delete this property?",
        );
        if (response) {
            mutate(
                {
                    resource: "properties",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/properties");
                    },
                },
            );
        }
    };
    
    function checkImage(url: any) {
        const img = new Image();
        img.src = url;
        return img.width !== 0 && img.height !== 0;
    }

 
    
    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor={theme.palette.mode === "dark" ? "#0E8388" : "#fcfcfc"}
            display='flex'
            flexDirection='column'

            
        >
            <Typography fontSize={25} fontWeight={700} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>
                Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                justifyContent='space-around'
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={600}   >
                    <img
                        src={propertyDetails.photo}
                        alt="property_details-img"
                        height={546}
                        
                        
                        style={{ objectFit: "contain", borderRadius: "10px",maxWidth:'450' }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color={theme.palette.mode === "dark" ? "white" :'#11142d'}
                                textTransform="capitalize"
                            >
                                {propertyDetails.propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color={theme.palette.mode === "dark" ? "white" :'#11142d'}
                                >
                                    {propertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color:theme.palette.mode === "dark" ? "white" :"#808191" }} />
                                    <Typography fontSize={14} color={theme.palette.mode === "dark" ? "white" :"#808191"}>
                                        {propertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color={theme.palette.mode === "dark" ? "white" :'#11142d'}
                                >
                                    Price
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color={theme.palette.mode === "dark" ? "white" :"#475BE8"}
                                    >
                                        ${propertyDetails.price}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color={theme.palette.mode === "dark" ? "white" :"#808191"}
                                        mb={0.5}
                                    >
                                        for one day
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>
                                Description
                            </Typography>
                            <Typography fontSize={14} color={theme.palette.mode === "dark" ? "white" :"#808191"}>
                                {propertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"  
                    flexDirection="column"
                    alignItems='center'
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(propertyDetails.creator.avatar)
                                        ? propertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px" display='flex' alignItems='center' >
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color={theme.palette.mode === "dark" ? "white" :'#11142d'}
                                >
                                    {propertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color={theme.palette.mode === "dark" ? "white" :"#808191"}
                                >
                                    Agent
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color:theme.palette.mode === "dark" ? "white" :"#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color={theme.palette.mode === "dark" ? "white" :"#808191"}
                                >
                                    North Carolina, USA
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color={theme.palette.mode === "dark" ? "white" :"#11142D"}
                            >
                                {propertyDetails.creator.allProperties.length}{" "}
                                Properties
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor={theme.palette.mode === "dark" ? "#2C3333" :"#475be8"}
                            color="#fcfcfc"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/properties/edit/${propertyDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color= "#fcfcfc"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack>
                        <Mapgoogle  propertyDetails={propertyDetails} />
                    </Stack>

                    <Box gap={4} display='flex' flexDirection='column' >
                    <DateRangePicker onChange={handleDateChange} value={value} />
                        <CustomButton
                            title="Book Now"
                            backgroundColor={theme.palette.mode === "dark" ? "#2C3333" :"#475be8"}
                            color="#fcfcfc"
                            fullWidth
                        />
                        
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};

export default PropertyDetails;