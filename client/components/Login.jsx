/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
const Login = () => {
  const [user,setUser] = useState({
    email:"",
    password:"",
    role:""
  })
  const navigate = useNavigate();
  const handelInput = (e) =>{
    let name = e.target.name
    let value = e.target.value;
    setUser({...user, [name]:value})
  }
  // const handleSubmit = async (e) =>{
  //   e.preventDefault();
  //   // console.log(user)
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/user/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //         body: JSON.stringify(user),
  //       }
  //     );
  //     const responseData = await response.json();
  //     console.log("responseData", responseData);
  //     if(response.ok){
  //       toast.success("Login Successfully");
        

  //       setUser({email: "", password: "",role: "", });
  //       navigate("/");
  //     }
  //     else{
  //       toast.error("Login Failed");
  //     }
  //   } catch (err) {
  //     toast.error(
  //       responseData.extraDetails
  //           ? responseData.extraDetails
  //           : responseData.message
  //     )
  //   }
  // }
  

const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log(user)
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      }
    );
    const responseData = await response.json();
    console.log("responseData", responseData);
    if (response.ok) {
      toast.success("Login Successfully");

      setUser({ email: "", password: "", role: "" });
      navigate("/");
    } else {
      toast.error(responseData.message ? responseData.message : "Login Failed");
    }
  } catch (err) {
    toast.error("An unexpected error occurred");
    console.error("Login error:", err);
  }
};

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handelInput}
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              value={user.password}
              onChange={handelInput}
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 rounded" />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handelInput}
              className="block w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            >
              <option value="Writer">Writer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <Button
              type="submit"
              className="relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign in
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
