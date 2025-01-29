import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";

export const SignupForm = ({ onSubmit, formData, handleChange, showPassword, setShowPassword, error, onLoginClick }) => {
  const { isModal, customImage, showBackground } = useAuthBackground();

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1000px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
  };

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = 
      formData.username?.trim() &&
      formData.email?.trim() &&
      formData.password?.trim() &&
      formData.confirmPassword?.trim() &&
      formData.phone?.trim() &&
      termsAccepted &&
      recaptchaChecked;
    
    setIsFormValid(isValid);
  }, [formData, termsAccepted, recaptchaChecked]);

  const handleRecaptchaChange = (value) => {
    setRecaptchaChecked(value);
  };

  const formContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        width: '100%',
        mx: 'auto',
        p: 3,
        bgcolor: '#ffffff',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Box display="flex" justifyContent="center" mb={4}>
        <LogoIcon />
      </Box>
      
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Create a new account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}

      <form onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid) {
          onSubmit(e);
        }
      }} style={{ width: '100%' }}>
        <Stack spacing={3}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="Enter your username"
            inputProps={{
              style: { fontSize: '16px' }
            }}
            InputLabelProps={{
              style: { fontSize: '16px' }
            }}
          />

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
            helperText="Password must be at least 8 characters and contain at least one number, one uppercase letter, and one special character"
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

          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="Confirm your password"
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

          <TextField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="+1 (555) 555-5555"
            inputProps={{
              style: { fontSize: '16px' }
            }}
            InputLabelProps={{
              style: { fontSize: '16px' }
            }}
          />

          

          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '14px', color: 'text.secondary' }}>
              By submitting this form, you are agreeing to the{' '}
              <Link 
                href="https://invotra.com/arto-data-processing-agreement" 
                target="_blank" 
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Data Processing Agreement
              </Link>
              {' '}and our{' '}
              <Link 
                href="https://invotra.com/arto-service-level-agreement/" 
                target="_blank" 
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Service Level Agreement
              </Link>
            </Typography>
          </Box>



          <Box sx={{ width: '100%', mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  name="terms"
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  I agree to the{' '}
                  <Link 
                    href="https://invotra.com/invotra-arto-application-terms-conditions/" 
                    target="_blank"
                    sx={{ 
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    terms & conditions
                  </Link>
                  *
                </Typography>
              }
            />
          </Box>


          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Box
              sx={{
                width: '302px',
                height: '76px',
                border: '1px solid #d3d3d3',
                borderRadius: 1,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                gap: 2,
              }}
            >
              <Checkbox
                checked={recaptchaChecked}
                size="small"
                sx={{ 
                  width: 24,
                  height: 24,
                  border: '2px solid #c1c1c1',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                }}
                onChange={(e) => handleRecaptchaChange(e.target.checked)}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#000000',
                  fontSize: '14px',
                  userSelect: 'none'
                }}
              >
                I'm not a robot
              </Typography>
              <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <img 
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADq0lEQVR4nO2bTWhcVRTHf+e+l7yZJLZJk0nSNKaIFawfiFAXbqwLaXEhdOFGLbhzWYoUpLhzVXChLgQFoYIK6qKCKEJFEKmgHxpKq2DaTNokM5P5yMu8e4+LeWmGvExmknnvTWbmBwPz3r3nnHP+/zn33HffHKhQoUKFChUq3JtIuQIrpbQAvUAHEAWiwIr5CQP15msFiAEzwBQwCowAk8aYTDnbXhQBSqkQcD/wELAD6AE2A21AtEDRJDAHTAPjwBAwCJw1xiyVo/15EVBfX9+mtX4GeBp4AGgqR0PyYBm4APwEHFJKnQbMnTTAcRyllNoF7DPGPAqo/2Nj88B14Cvg60gkcn1lZSWbT8G8I0ApFQaeBT4CHsyn7DpyGfgYOGSMWb5dgTsKoJTqAD4Fdt9Qzn2OAK8ZY0auF+B2jXWUUnuBs9xd5MH09Zx5DdfhlhGglGoGvgWeXEvhuwwDvGiM+eZmJ28qgFLqMeB7oHkdG1YOEsBeY8wvuSdyp4BSqgv4jP+/8wDNmL4/lHsyRwCllAv8CLSvd6vKSLvp+0O5Ua+Ap4BHNqhR5eQR0/8s2QgQQA5v4Ia1AXvcHEkCvABs2+AGlZNtpi9ZsgIopVqBdzaqNeXGWLLX9AnIjoBXgcaNbFC5MZY8Y/oEZAXYs8GNKTd7ILcRbgJ6y1B5q1Kqyfxt01pPK6WSQAZIGmPm76RypZQDNGitW4EWrXUzcA/QAawDPb29vb8PDQ39FQqFdgKbylC5UkoNWJYVtSxrxrKsK7Ztj9i2PWrb9l+2bU/Ztj1n2/ayZVkr4XB4JRwOZ8LhsI5EIjoajepIJEI0GqWhoSFbR2NjY7aexsZGHMcBwHVdXNfFcZxsnXcohEspRXd3N11dXWzZsoWOjg46OzsRkew1RIR4PE48HicWizE7O8vMzAzT09PMzc2RyWRQSpFMJkkmk6RSKdLpNOl0mlQqxdLSEktLS2QyGUSEdDpNOp0mlUqRSCRIJBIsLCwQj8dZXFwkkUiQTCZJpVKk02nS6TTGGESEdDpNJpMhk8mQzWCZTIZMJkMmk8EYk/1kjw0YY7L5QinF4uIiCwsLxONxFhcXSSQSpFIpUqkU6XSaVCqVbWsqlSKZTJJIJFhcXGRhYYF4PE4ikSCZTGbbkEwmSaVSpNNpjDFZ+xKJBPPz88zPz7OwsEAikSCZTGbbkEwmWV5eZnl5mVQqxfLyMisrK6yurpJOp0mn02QyGYwxWKUSQP6tQEQwxmCMQUSyvxvzr5D7ICKICCKSPXat/PXnrpW//nzhcteolKpQoUKFChX+BfwDNvj6RKhLKkQAAAAASUVORK5CYII="
                  alt="reCAPTCHA"
                  style={{ width: '30px', height: '30px' }}
                />
                <Typography variant="caption" sx={{ fontSize: '10px', color: '#555555' }}>
                  reCAPTCHA
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!isFormValid}
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
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
                  Sign in
                </Link>
              </RouterLink>
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
          bgcolor: '#ffffff'
        }}>
          {showBackground && (
            <Box
              sx={{
                flex: '1 1 60%',
                backgroundImage: `url(${customImage || '/static/images/backgrounds/auth-bg.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: { xs: 'none', md: 'block' }
              }}
            />
          )}
          {formContent}
        </Box>
      </Box>
    );
  }

  return formContent;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters and contain at least one number, one uppercase letter, and one special character");
      return;
    }

    try {
      await signup(formData.email, formData.password);
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  const handleToggleForm = () => {
    // Add your form toggle logic here
  };

  return (
    <SignupForm
      onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      error={error}
      onToggleForm={handleToggleForm}
      onLoginClick={() => console.log('Login clicked')}
    />
  );
};

export default Signup;
