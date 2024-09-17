// import { useGetUserMutation } from './redux/slices/authService';

// const Tryout = () => {
//   const [getUser, { isLoading, isError, error }] = useGetUserMutation();

//   async function handleClick() {
//     try {
//       const userData = await getUser({
//         email: 'jpvelloor@gmail.com',
//         password: '12345',
//       });
//       console.log(userData);
//     } catch (error) {
//       console.log(' try catch error', error);
//     }
//   }
//   if (isLoading) {
//     return <h1>Loading</h1>;
//   }
//   if (isError) {
//     console.log(' query error', error);
//     return <h1>Error</h1>;
//   }

//   return <button onClick={handleClick}>Click me</button>;
// };

// export default Tryout;
