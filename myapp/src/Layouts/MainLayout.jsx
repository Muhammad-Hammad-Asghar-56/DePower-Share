import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/NavBar'; // Adjust the import path to where your Navbar component is
import { useUserContext } from '../Context/UserContext'; // Adjust path as needed
import Cookies from 'js-cookie';
import { getUser } from '../BackendApi/Users';

const MainLayout = () => {
    const { data, setData } = useUserContext();
    useEffect(() => {
        const cookieData = Cookies.get('userData');
        try{
          if (cookieData!=null) {
            const parsedData = JSON.parse(cookieData);
            setData(parsedData);
          }
        }
        catch(exception){
          Cookies.remove('userData');
        }
      }, 
    [setData]);
    // useEffect(()=>{
    //     const updateUser=async()=>{

    //       if(data && data?.walletAddress){
    //         let user =await getUser(data.walletAddress);
    //         console.log(user);
    //         setData(user);
    //       }
    //     }
    //     updateUser();
    //   },[])
  return (
    <div>
      <div className='fixed z-10000'>

      <Navbar />
      </div>
      <main className='z-0'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
