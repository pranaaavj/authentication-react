import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../api/adminApi';

export const DashUsers = () => {
  const navigate = useNavigate();
  const { data: { data: { users = [] } = {} } = {}, refetch } =
    useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredUsers(filtered);
    refetch();
  }, [users, searchItem, refetch]);

  const handleEditUser = async (id) => {
    navigate(`/admin-dashboard/edit-user/${id}`);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
  };

  return (
    <div className='p-12 dark:bg-gray-900 min-h-screen'>
      {/* Top Bar */}
      <div className='flex justify-between items-center mb-6'>
        {/* Search Bar */}
        <div className='hidden lg:flex items-center space-x-2'>
          <TextField
            type='text'
            variant='outlined'
            label='Search Users'
            size='small'
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className='dark:bg-gray-700 dark:text-white rounded-lg focus:outline focus:ring-0 ring-0 focus:border-none'
          />
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => setSearchItem('')}
            className='ml-2 bg-red-500 text-white hover:bg-red-600'>
            Clear
          </Button>
        </div>

        {/* Add User Button */}
        <Button
          variant='contained'
          color='primary'
          className='bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white'
          onClick={() => navigate(`/admin-dashboard/add-user`)}>
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <TableContainer
        component={Paper}
        className='dark:bg-gray-800 shadow-md rounded-lg'>
        <Table
          sx={{ minWidth: 650 }}
          className='dark:text-white'>
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                className='dark:bg-gray-800'>
                No
              </TableCell>
              <TableCell
                align='center'
                className='dark:bg-gray-800'>
                Username
              </TableCell>
              <TableCell
                align='center'
                className='dark:bg-gray-800'>
                Email
              </TableCell>
              <TableCell
                align='center'
                className='dark:bg-gray-800'>
                Role
              </TableCell>
              <TableCell
                align='center'
                className='dark:bg-gray-800'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.length > 0 &&
              filteredUsers.map((user, i) => (
                <TableRow
                  key={user.username}
                  className='dark:bg-gray-700'>
                  <TableCell
                    align='center'
                    className='dark:text-gray-300'>
                    {i + 1}
                  </TableCell>
                  <TableCell
                    align='center'
                    className='dark:text-gray-300'>
                    {user.username}
                  </TableCell>
                  <TableCell
                    align='center'
                    className='dark:text-gray-300 '>
                    {user.email}
                  </TableCell>
                  <TableCell
                    align='center'
                    className='dark:text-gray-300'>
                    {user.role}
                  </TableCell>
                  <TableCell
                    align='center'
                    className='dark:text-gray-300'>
                    {user?.role === 'user' ? (
                      <div className='flex justify-center space-x-2'>
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={() => handleEditUser(user.id)}
                          className='hover:bg-blue-600 text-blue-600 hover:text-white'>
                          Edit
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          color='error'
                          onClick={() => handleDeleteUser(user.id)}
                          className='hover:bg-red-600 text-red-600 hover:text-white'>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <Alert severity='error'>Admins Cannot Be Modified</Alert>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
