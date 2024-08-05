/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// function UserTable() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editingUser, setEditingUser] = useState(null);
//     const [updatedUser, setUpdatedUser] = useState({});
  
//     useEffect(() => {
//             const fetchUsers = async () => {
//               try {
//                 const authToken = Cookies.get('token');
//                 // console.log("Token: " + authToken);
        
//                 const response = await fetch("https://task-2-blog-website-1.onrender.com/api/admin/show-users", {
//                   method: "GET",
//                   headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${authToken}`,
//                   },
//                 });
        
//                 if (!response.ok) {
//                   throw new Error('Network response was not ok');
//                 }
        
//                 const responseData = await response.json();
//                 console.log("Response data: ", responseData);
        
//                 setUsers(responseData);
//                 setLoading(false);
//               } catch (error) {
//                 console.error('Error fetching users:', error);
//                 setLoading(false);
//               }
//             };
        
//             fetchUsers();
//           }, []);
//     const handleEditClick = (user) => {
//       setEditingUser(user);
//       setUpdatedUser(user);
//       setIsEditModalOpen(true);
//     };
  
//     const handleEditChange = (e) => {
//       const { name, value } = e.target;
//       setUpdatedUser(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     };
  
//     const handleEditSubmit = async () => {
//       try {
//         const authToken = Cookies.get('token');
//         const response = await fetch(`https://task-2-blog-website-1.onrender.com/api/admin/update-user/${editingUser._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//           },
//           body: JSON.stringify(updatedUser)
//         });
  
//         if (!response.ok) {
//           toast.error('Failed to edit user');
//           return;
//         }
  
//         toast.success("User edited successfully");
//         setUsers(users.map(user => user._id === editingUser._id ? updatedUser : user));
//         setIsEditModalOpen(false);
//       } catch (error) {
//         console.error('Error editing user:', error);
//         toast.error('Error editing user');
//       }
//     };
  
//     const handleDelete = async (userId) => {
//       try {
//         const authToken = Cookies.get('token');
//         const response = await fetch(`https://task-2-blog-website-1.onrender.com/api/admin/delete-user/${userId}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//           }
//         });
  
//         if (!response.ok) {
//           toast.error('Failed to delete user');
//           return;
//         }
  
//         toast.success("User deleted successfully");
//         setUsers(users.filter(user => user._id !== userId));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         toast.error('Error deleting user');
//       }
//     };
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <div className="overflow-auto border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Username</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Verified</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell className="font-medium">{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   {user.isVerified ? (
//                     <Badge variant="success">Verified</Badge>
//                   ) : (
//                     <Badge variant="danger">Not Verified</Badge>
//                   )}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Button variant="ghost" size="icon" onClick={() => handleEditClick(user._id)}>
//                     <FilePenIcon className="h-4 w-4" />
//                     <span className="sr-only">Edit {user.username}</span>
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)}>
//                     <TrashIcon className="h-4 w-4" />
//                     <span className="sr-only">Delete {user.username}</span>
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
  
//         {isEditModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Edit User</h2>
//               <label>
//                 Username:
//                 <input type="text" name="username" value={updatedUser.username} onChange={handleEditChange} />
//               </label>
//               <label>
//                 Email:
//                 <input type="email" name="email" value={updatedUser.email} onChange={handleEditChange} />
//               </label>
//               <label>
//                 Role:
//                 <input type="text" name="role" value={updatedUser.role} onChange={handleEditChange} />
//               </label>
//               <label>
//                 Verified:
//                 <input type="checkbox" name="verified" checked={updatedUser.verified} onChange={() => setUpdatedUser(prevState => ({
//                   ...prevState,
//                   verified: !prevState.verified
//                 }))} />
//               </label>
//               <Button onClick={handleEditSubmit}>Submit</Button>
//               <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
  

function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const authToken = Cookies.get('token');
  
          const response = await fetch("https://task-2-blog-website-1.onrender.com/api/admin/show-users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${authToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const responseData = await response.json();
          setUsers(responseData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    const handleEditClick = (user) => {
      setEditingUser(user);
      setUpdatedUser(user);
      setIsEditModalOpen(true);
    };
  
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setUpdatedUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleEditSubmit = async () => {
      try {
        const authToken = Cookies.get('token');
        const response = await fetch(`https://task-2-blog-website-1.onrender.com/api/admin/update-user/${editingUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(updatedUser)
        });
  
        if (!response.ok) {
          toast.error('Failed to edit user');
          return;
        }
  
        toast.success("User edited successfully");
        setUsers(users.map(user => user._id === editingUser._id ? updatedUser : user));
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Error editing user:', error);
        toast.error('Error editing user');
      }
    };
  
    const handleDelete = async (userId) => {
      try {
        const authToken = Cookies.get('token');
        const response = await fetch(`https://task-2-blog-website-1.onrender.com/api/admin/delete-user/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
  
        if (!response.ok) {
          toast.error('Failed to delete user');
          return;
        }
  
        toast.success("User deleted successfully");
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.isVerified ? (
                    <Badge variant="success">Verified</Badge>
                  ) : (
                    <Badge variant="danger">Not Verified</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)}>
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit {user.username}</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete {user.username}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Edit User</h2>
              <label className="block mb-2">
                Username:
                <input type="text" name="username" value={updatedUser.username} onChange={handleEditChange} className="block w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded" />
              </label>
              <label className="block mb-2">
                Email:
                <input type="email" name="email" value={updatedUser.email} onChange={handleEditChange} className="block w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded" />
              </label>
              <label className="block mb-2">
                Role:
                <input type="text" name="role" value={updatedUser.role} onChange={handleEditChange} className="block w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded" />
              </label>
              <label className="block mb-4">
                Verified:
                <input type="checkbox" name="verified" checked={updatedUser.verified} onChange={() => setUpdatedUser(prevState => ({
                  ...prevState,
                  verified: !prevState.verified
                }))} className="ml-2" />
              </label>
              <Button onClick={handleEditSubmit} className="mr-2">Submit</Button>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
  

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default UserTable;
