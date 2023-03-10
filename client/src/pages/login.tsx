import { useEffect, useRef,useState} from "react";
import { useLogin, useRegister } from "@pankod/refine-core";
import { Container, Box, display, Stack } from "@pankod/refine-mui";
import {yariga} from "../assets";
import { CredentialResponse } from "../interfaces/google";
import { TextField, Button } from "@mui/material";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: register } = useRegister<any>();


  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register({ email, password });
  };

  return (
    <Box >
        <form style={{display:'flex' ,flexDirection: 'column'}} onSubmit={handleRegister}>
      
      <TextField
        label="Email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}

      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}

      />
      <Stack display='flex' flexDirection='row' justifyContent='space-around' >
      <Button type="submit">Register</Button>
      <Button type="submit">login</Button>
      </Stack>
     
    </form>
      </Box>
    
  );
};

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: '#FCFCFC'
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={yariga} alt="yariga Logo" />
          </div>
          <Box mt={4}>
          <RegisterForm/>
            <GoogleButton />
            
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
