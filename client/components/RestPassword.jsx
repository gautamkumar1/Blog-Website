/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {useNavigate,useParams} from "react-router-dom"
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Debugging output to check if ID is correct
      console.log("ID from params:", id);

      const response = await fetch(
        `https://task-2-blog-website-1.onrender.com/api/user/reset_password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData", responseData);
        toast.success('Password successfully reset.');
        // setPassword('');
        navigate("/login");
      } else {
        // Handle non-200 responses
        const errorData = await response.json();
        console.error("Error data:", errorData);
        toast.error("Password Change Failed");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while changing password");
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Change Password
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;


