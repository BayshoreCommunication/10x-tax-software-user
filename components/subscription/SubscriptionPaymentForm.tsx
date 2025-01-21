"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { BsBank, BsCreditCard } from "react-icons/bs";
import { SlPaypal } from "react-icons/sl";
import BankCheckoutForm from "./PaymentOption/BankCheckoutForm";
import CardCheckoutForm from "./PaymentOption/CardCheckoutForm";
import PaypalCheckoutForm from "./PaymentOption/PaypalCheckoutForm";

interface PaymentInfo {
  email: string;
  name: string;
  country: string;
  address: string;
  paymentId: string;
}

interface SubscriptionInfo {
  subscriptionDate: Date | null;
  subscriptionExpiredDate: Date | null;
  type: string;
}

interface SubscriptionPaymentFormProps {
  subscriptionType: string;
  token: any;
}

const SubscriptionPaymentForm: React.FC<SubscriptionPaymentFormProps> = ({
  subscriptionType,
  token,
}) => {
  const [selectPaymentMethod, setSelectPaymentMethod] =
    useState<string>("card");

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [amount, setAmount] = useState<number>(0);

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    email: "",
    name: "",
    country: "",
    address: "",
    paymentId: "",
  });

  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    subscriptionDate: null,
    subscriptionExpiredDate: null,
    type: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const currentDate = new Date();
    let subscriptionExpiredDate: Date | null = null;

    if (subscriptionType === "monthly") {
      subscriptionExpiredDate = new Date(currentDate);
      subscriptionExpiredDate.setDate(currentDate.getDate() + 30);
    } else if (subscriptionType === "yearly") {
      subscriptionExpiredDate = new Date(currentDate);
      subscriptionExpiredDate.setDate(currentDate.getDate() + 365);
    }

    const calculatedAmount = subscriptionType === "monthly" ? 99 : 999;
    setAmount(calculatedAmount);

    setSubscriptionInfo({
      subscriptionDate: currentDate,
      subscriptionExpiredDate,
      type: subscriptionType,
    });
  }, [subscriptionType]);

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="bg-white  p-12 w-[65%]">
        <h2 className="text-3xl font-bold text-[#11142D] text-left py-4">
          Choose Your Payment Method
        </h2>

        <div className="p-14">
          <div className="mb-5">
            <h4 className="text-2xl font-medium text-[#11142D] text-left py-2">
              Contact Info
            </h4>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Email
              </label>

              <input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                value={paymentInfo.email}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-2xl font-medium text-[#11142D] text-left py-2">
              Shipping
            </h4>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Name
              </label>

              <input
                autoComplete="off"
                type="text"
                id="name"
                name="name"
                value={paymentInfo.name}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="Enter name"
              />
            </div>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Country / region
              </label>

              <input
                autoComplete="off"
                type="text"
                id="country"
                name="country"
                value={paymentInfo.country}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="United States"
              />
            </div>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Address
              </label>

              <input
                autoComplete="off"
                type="text"
                id="address"
                name="address"
                value={paymentInfo.address}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="210 Tempo st."
              />
            </div>
          </div>
          <div className="mb-5">
            <h4 className="text-2xl font-medium text-[#11142D] text-left py-2">
              Payment Method
            </h4>
            <div className="py-3 flex items-center justify-between space-x-8 w-full">
              <button
                onClick={() => setSelectPaymentMethod("card")}
                className={`border  px-5 py-8 w-full rounded  ${selectPaymentMethod === "card" ? "border-primary bg-gray-50" : ""}`}
              >
                <div className="flex justify-center items-center">
                  <BsCreditCard className="text-primary size-10" />
                </div>
                <p className="text-xl font-medium text-gray-900 mt-3 text-center">
                  Card
                </p>
              </button>
              <button
                onClick={() => setSelectPaymentMethod("paypal")}
                className={`border  px-5 py-8 w-full rounded  ${selectPaymentMethod === "paypal" ? "border-primary bg-gray-50" : ""}`}
              >
                <div className="flex justify-center items-center">
                  <SlPaypal className="text-primary size-10" />
                </div>
                <p className="text-xl font-medium text-gray-900 mt-3 text-center">
                  Paypal
                </p>
              </button>
              <button
                onClick={() => setSelectPaymentMethod("bank")}
                className={`border  px-5 py-8 w-full rounded  ${selectPaymentMethod === "bank" ? "border-primary bg-gray-50" : ""}`}
              >
                <div className="flex justify-center items-center">
                  <BsBank className="text-primary size-9" />
                </div>
                <p className="text-xl font-medium text-gray-900 mt-3 text-center">
                  Bank
                </p>
              </button>
            </div>

            {/* Check Payment Option */}
            {selectPaymentMethod === "card" ? (
              <CardCheckoutForm
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                subscriptionInfo={subscriptionInfo}
                amount={amount}
                token={token}
              />
            ) : selectPaymentMethod === "paypal" ? (
              <PaypalCheckoutForm />
            ) : (
              <BankCheckoutForm 
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                subscriptionInfo={subscriptionInfo}
                amount={amount}
                token={token}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPaymentForm;
