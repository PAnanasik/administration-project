import React from 'react'
import ListAllPartners from '../../components/client/ListAllPartners';
import { Navbar, SidebarClient } from '../../components';
import Background from '../../components/common/Background';

const ClientAllPartnersList = () => {
  const token = window.localStorage.getItem("token");

  return (
    <div>
      <SidebarClient />
      <Navbar />
      <div className="relative z-0">
        <ListAllPartners token={token} />
        <Background />
      </div>
    </div>
  );
}

export default ClientAllPartnersList