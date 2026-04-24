import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <>
      <TopNavBar />
      <Sidebar />
      <Outlet />
    </>
  );
}
