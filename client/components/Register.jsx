/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
const Register = () => {
  const [user,setUser] = useState({
    username:"",
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

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log(user)
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/register",
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
      if(response.ok){
        toast.success("Registration Successfully");
        

        setUser({ username: "", email: "", password: "",role: "", });
        // navigate("/login");
      }
      else{
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        )
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
          <p className="mt-2 text-muted-foreground">Get started with our platform today.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Username</Label>
            <Input id="name" type="text" name="username" value={user.username} onChange={handelInput} placeholder="Enter your username" required />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" name="email" value={user.email} onChange={handelInput} placeholder="name@example.com" required />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" name="password" value={user.password} onChange={handelInput} placeholder="Enter your password" required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={user.role} onChange={handelInput}
              className="block w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            >
              <option value="Writer">Writer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
