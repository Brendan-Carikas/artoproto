import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import { useTheme } from "@mui/material/styles";
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";

interface ForgotPasswordFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formData: {
    email: string;
    username?: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, formData, handleChange, error }) => {
  const { isModal, customImage, showBackground } = useAuthBackground();
  const theme = useTheme();

  const formContent = (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: 0
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
          display: { xs: 'none', sm: 'none', md: 'block' },
          marginRight: '16px',
          marginBottom: '72px'
        }}
      />
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: '100%',
            sm: '480px'
          },
          height: {
            xs: '100vh',
            sm: 'auto'
          },
          mx: {
            xs: 0,
            sm: 'auto'
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
          },
          p: {
            xs: 4,
            sm: 5
          },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <LogoIcon />
          </Box>

          <Typography variant="h3" textAlign="center" sx={{ mb: 1, fontWeight: 500 }}>
            Forgot Password
          </Typography>

          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 2 }}>
            Enter username and we will send you a code.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={onSubmit} style={{ width: "100%" }}>
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Send Reset Instructions
              </Button>

              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <RouterLink to="/login" style={{ textDecoration: "none" }}>
                  <Link
                    component="span"
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Back to Sign in
                  </Link>
                </RouterLink>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );

  return formContent;
};

interface ForgotPasswordFormData {
  username: string;
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    username: "",
    email: "",
  });
  const [error, setError] = useState<string>("");
  const { resetPassword } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setError("");
      await resetPassword(formData.email || formData.username);
      // You can add success message or redirect logic here
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      error={error}
    />
  );
};

export default ForgotPassword;
