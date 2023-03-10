import { useList } from "@pankod/refine-core";
import { Box, Typography, useTheme } from "@pankod/refine-mui";

import { AgentCard } from "components";

const Agents = () => {
    const { data, isLoading, isError } = useList({ resource: "users" });
    const theme=useTheme();
    const allAgents = data?.data ?? [];
    
    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;
    if (allAgents.length === 0) return null;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>
                Agents List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor:theme.palette.mode === "dark" ? "#0E8388" : "#fcfcfc",
                }}
            >
                 {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length}
          />
                ))}
            </Box>
        </Box>
    );
};

export default Agents;
