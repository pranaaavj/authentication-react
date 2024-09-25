import { useDeleteUserMutation, useGetAllUsersQuery } from '../api/adminApi';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: { data: { users = [] } = {} } = {} } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchItem]);

  const handleEditUser = async (id) => {
    navigate(`/admin-dashboard/edit-user/${id}`);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
  };

  return (
    <div className='p-12'>
      <input
        type='text'
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <Button onClick={() => setSearchItem('')}>Clear</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>no</TableCell>
              <TableCell align='center'>username</TableCell>
              <TableCell align='center'>email</TableCell>
              <TableCell align='center'>role</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.length > 0 &&
              filteredUsers.map((user, i) => (
                <TableRow key={user.username}>
                  <TableCell align='center'>{i + 1}</TableCell>
                  <TableCell align='center'>{user.username}</TableCell>
                  <TableCell align='center'>{user.email}</TableCell>
                  <TableCell align='center'>{user.role}</TableCell>
                  <TableCell align='center'>
                    <div>
                      <Button onClick={() => handleEditUser(user.id)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
