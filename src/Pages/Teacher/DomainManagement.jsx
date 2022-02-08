import React from "react";
import SideBar from "../../Components/Teacher/TeacherHome/TeacherSideBar";
import DomainTable from "../../Components/Teacher/DomainManagement/Domains";

function DomainManagement() {
  return (
    <div className="d-flex">
      <SideBar domain={true} />
      <div className="p-3">
        <DomainTable />
      </div>
    </div>
  );
}

export default DomainManagement;
