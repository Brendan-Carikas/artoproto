import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";
import { Link as RouterLink } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formData: {
    email: string;
    password: string;
    rememberme?: boolean;
    confirmPassword?: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error: string;
  onSignupClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  formData, 
  handleChange, 
  showPassword, 
  setShowPassword, 
  error, 
  onSignupClick 
}) => {
  const { isModal, customImage } = useAuthBackground();

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1000px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
  };

  const formContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: {
          xs: '100%',
          sm: '480px'
        },
        width: '100%',
        height: {
          xs: '100vh',
          sm: 'auto'
        },
        mx: {
          xs: 0,
          sm: 'auto'
        },
        p: {
          xs: 4,
          sm: 5
        },
        bgcolor: 'background.paper',
        borderRadius: {
          xs: '0px 0px 0px 0px',
          sm: '100px 100px 100px 0px'
        },
        boxShadow: {
          xs: 0,
          sm: 1
        },
        border: {
          xs: 'none',
          sm: '1px solid rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <Box display="flex" justifyContent="center" mb={4}>
        <LogoIcon />
      </Box>
      
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 500 }}>
        Sign in
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}

      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="Enter your email"
            inputProps={{
              style: { fontSize: '16px' }
            }}
            InputLabelProps={{
              style: { fontSize: '16px' }
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              placeholder="Enter your password"
              inputProps={{
                style: { fontSize: '16px' }
              }}
              InputLabelProps={{
                style: { fontSize: '16px' }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <RouterLink to="/forgot-password" style={{ textDecoration: 'none' }}>
                <Link
                  component="span"
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </RouterLink>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              No account?{' '}
              {onSignupClick ? (
                <Button
                  color="primary"
                  onClick={onSignupClick}
                  sx={{ 
                    textTransform: 'none',
                    p: 0,
                    minWidth: 'auto',
                    fontWeight: 'bold',
                    color: 'primary.main'
                  }}
                >
                  Create account
                </Button>
              ) : (
                <RouterLink to="/signup">
                  <Link
                    component="span"
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Create account
                  </Link>
                </RouterLink>
              )}
            </Typography>
          </Box>
        </Stack>
      </form>
    </Box>
  );

  if (isModal) {
    return (
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}>
        <Box sx={{
          ...modalStyle,
          bgcolor: 'background.default',
        }}>
          <Box
            sx={{
              flex: '1 1 60%',
              position: 'relative',
              display: { xs: 'none', sm: 'none', md: 'block' }
            }}
          >
            <Box
              component="img"
              src="/static/images/backgrounds/arto-corner.png"
              alt=""
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                maxHeight: {
                  sm: '250px',
                  md: '300px'
                },
                width: 'auto',
                marginRight: '16px',
                marginBottom: '72px',
                display: { xs: 'none', sm: 'none', md: 'block' }
              }}
            />
          </Box>
          {formContent}
        </Box>
      </Box>
    );
  }

  return formContent;
};

interface LoginFormData {
  email: string;
  password: string;
  rememberme: boolean;
}

const LoginNew: React.FC = () => {
  const { login } = useAuth();
  const { isModal, customImage } = useAuthBackground();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberme: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "rememberme" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setError("Incorrect username or password");
    }
  };

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <LoginForm
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={error}
      />
    </Box>
  );
};

export { LoginForm };
export default LoginNew;
