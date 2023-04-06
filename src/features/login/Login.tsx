import { FormEvent, useEffect, useRef, useState } from "react";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Login = () => {
  // References
  const refUser = useRef<any>(null);
  const refErr = useRef<HTMLSpanElement>(null);

  // State
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Děláno podle toho https://www.youtube.com/watch?v=X3qyxo_UTR4

  // Other
  useEffect(() => {
    refUser.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUser("");
    setPassword("");
    setSuccess(true);
  };

  return (
    <ErrorBoundary>
      <>
        {success ? (
          <Box component='section'>
            <Typography variant='h1'>Byli jste přihlášení</Typography>
            <br />
            <Typography>
              <Box component='a' href='#'>
                Domů
              </Box>
            </Typography>
          </Box>
        ) : (
          <Box component='section'>
            <Typography variant='h1'>Přihlášení</Typography>
            <Typography
              ref={refErr}
              className={errMsg ? "err-msg" : "offcreen"}
              aria-live='assertive'
            >
              {errMsg}
            </Typography>

            <form onSubmit={handleOnSubmit}>
              <TextField
                ref={refUser}
                label='Email'
                type='email'
                id='user-name'
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <TextField
                label='Heslo'
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />

              <Button type='submit'>Přihlásit</Button>
            </form>
          </Box>
        )}
      </>
    </ErrorBoundary>
  );
};

export default Login;
