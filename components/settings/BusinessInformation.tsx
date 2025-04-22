"use client";
import { useState } from "react";
import EmailUpdateForm from "./EmailUpdateForm";
import InformationUpdateForm from "./InformationUpdateForm";
import PasswordUpdateForm from "./PasswordUpdateForm";

const BusinessInformation = ({ userData }: { userData: any }) => {
  const [userInfoUpdateFlag, setUserInfoUpdateFlag] = useState<boolean>(false);
  const [userEmailUpdateFlag, setUserEmailUpdateFlag] =
    useState<boolean>(false);
  const [userPasswordUpdateFlag, setUserPasswordUpdateFlag] =
    useState<boolean>(false);

  return (
    <div className="container py-10">
      <div className=" bg-white p-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#11142D]">
            Business Information
          </h2>
        </div>
        <div className="border p-6">
          <InformationUpdateForm
            userData={userData}
            userInfoUpdateFlag={userInfoUpdateFlag}
            setUserInfoUpdateFlag={setUserInfoUpdateFlag}
            setUserEmailUpdateFlag={setUserEmailUpdateFlag}
            setUserPasswordUpdateFlag={setUserPasswordUpdateFlag}
          />

          <EmailUpdateForm
            userData={userData}
            userEmailUpdateFlag={userEmailUpdateFlag}
            setUserInfoUpdateFlag={setUserInfoUpdateFlag}
            setUserEmailUpdateFlag={setUserEmailUpdateFlag}
            setUserPasswordUpdateFlag={setUserPasswordUpdateFlag}
          />

          <PasswordUpdateForm
            userData={userData}
            userPasswordUpdateFlag={userPasswordUpdateFlag}
            setUserPasswordUpdateFlag={setUserPasswordUpdateFlag}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;
