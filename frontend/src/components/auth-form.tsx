// @ts-nocheck
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const extractUsernameFromEmail = (email) => {
  return email?.split("@")[0]?.trim() || "";
};

const validateForm = ({ email, password, username, isRegister }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (isRegister && !username) {
    errors.username = "Username is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

function LoginForm({
  onSubmit,
  onGoogleLogin,
  onRegisterClick,
  formState,
  setFormState,
  errors,
}) {
  return (
    <form onSubmit={onSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
                className={errors?.email ? "border-red-500" : ""}
              />
              {errors?.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={formState.password}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={errors?.password ? "border-red-500" : ""}
              />
              {errors?.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="flex items-center justify-center">
              <GoogleLogin
                width={300}
                onSuccess={onGoogleLogin}
                onError={() => {
                  console.error("Google Login Failed");
                  setFormState((prev) => ({
                    ...prev,
                    error: "Google login failed",
                  }));
                }}
              />
            </div>
            {errors?.submit && (
              <span className="text-sm text-red-500 text-center">
                {errors.submit}
              </span>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onRegisterClick}
              className="underline text-blue-600"
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

function SignUpForm({
  onSubmit,
  onGoogleLogin,
  onLoginClick,
  formState,
  setFormState,
  errors,
}) {
  return (
    <form onSubmit={onSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your account info to register</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={formState.username}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className={errors?.username ? "border-red-500" : ""}
              />
              {errors?.username && (
                <span className="text-sm text-red-500">{errors.username}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
                className={errors?.email ? "border-red-500" : ""}
              />
              {errors?.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formState.password}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={errors?.password ? "border-red-500" : ""}
              />
              {errors?.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <div className="flex items-center justify-center">
              <GoogleLogin
                width={300}
                onSuccess={onGoogleLogin}
                onError={() => {
                  console.error("Google Login Failed");
                  setFormState((prev) => ({
                    ...prev,
                    error: "Google login failed",
                  }));
                }}
              />
            </div>
            {errors?.submit && (
              <span className="text-sm text-red-500 text-center">
                {errors.submit}
              </span>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="underline text-blue-600"
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default function AuthForm({ isLoggedIn, setIsLoggedIn }) {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    credential: "", // Google token or regular password
    isGoogle: false,
    error: null,
  });
  const [errors, setErrors] = useState({});
  const { createUser, fetchUsers, users, setUsers, updateUser, findUser } =
    useUserStore();

  useEffect(() => {
    console.log("Form State Updated:", {
      isRegister,
      formState,
      errors,
      currentUsers: users,
    });
  }, [formState, errors, isRegister, users]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate the form inputs
    const validation = validateForm({ ...formState, isRegister });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      const userData = {
        username:
          formState.username || extractUsernameFromEmail(formState.email),
        email: formState.email,
        password: formState.password,
        credential: formState.password,
      };

      if (isRegister) {
        const result = await createUser(userData);
        if (!result.success) {
          setErrors({ submit: result.message });
          return;
        }
        setUsers([...users, result.data]); // Add new user to store
        resetFormState();
        // alert("Registration Successful!");
        toast("Register Successfull", {
          description: "Please Sign In to access platform",
        });

        setIsRegister(!isRegister);
      } else {
        const result = await findUser(userData); // Using the `findUser` function
        if (!result.success) {
          setErrors({ submit: result.message });
          return;
        }
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userData", JSON.stringify(userData));
        toast("Successfull", {
          description: "Login Successfull",
        });

        navigate("/case");

        // alert("Login Successful!");
        // resetFormState();
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setErrors({ submit: "Authentication failed. Please try again." });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const googleUserData = {
        username: decoded.name,
        email: decoded.email,
        password: credentialResponse.credential.slice(0, 15), // Use Google credential
        credential: credentialResponse.credential.slice(0, 15),
        isGoogle: true,
      };

      if (isRegister) {
        const result = await createUser(googleUserData);
        if (!result.success) {
          setErrors({ submit: result.message });
          return;
        }
        setUsers([...users, result.data]); // Add to store
        setIsRegister(!isRegister);
        toast("Google Register Successfull", {
          description: "Please Sign In to access platform",
        });
        // alert("Google Registration Successful!");
      } else {
        const result = await findUser(googleUserData);
        if (!result.success) {
          setErrors({ submit: result.message });
          return;
        }

        toast("Successfull", {
          description: "Login Successfull",
        });
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userData", JSON.stringify(googleUserData));

        navigate("/case");

        setTimeout(() => {
          location.reload();
        }, 1000);

        // location.reload();
      }

      // resetFormState();
    } catch (error) {
      console.error("Google Login Error:", error);
      setErrors({ google: "Google login failed. Please try again." });
    }
  };

  const toggleRegister = () => {
    setIsRegister((prev) => !prev);
    resetFormState();
  };

  const resetFormState = () => {
    setFormState({
      username: "",
      email: "",
      password: "",
      credential: "",
      isGoogle: false,
      error: null,
    });
    setErrors({});
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {isRegister ? (
        <SignUpForm
          onSubmit={handleFormSubmit}
          onGoogleLogin={handleGoogleLogin}
          onLoginClick={toggleRegister}
          formState={formState}
          setFormState={setFormState}
          errors={errors}
        />
      ) : (
        <LoginForm
          onSubmit={handleFormSubmit}
          onGoogleLogin={handleGoogleLogin}
          onRegisterClick={toggleRegister}
          formState={formState}
          setFormState={setFormState}
          errors={errors}
        />
      )}
    </div>
  );
}
