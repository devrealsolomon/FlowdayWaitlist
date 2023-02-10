import Button from "../components/Button";
import Social from "../components/Social";
import React, { useState } from "react";

import validator from "validator";
import axios from "axios";
import Modal from "../components/Modal";

export default function Home() {
  const [email, setEmail] = useState("");

  const [background, setBackground] = useState("bg-relectr-grey");

  const [errorVisibility, setErrorVisibility] = useState("invisible");

  const [modalVisibility, setModalVisibility] = useState("hidden");

  const [errorText, setErrorText] = useState("Please fill out this field!");

  const [modalType, setModalType] = useState("success");
  

  const [buttonText, setButtonText] = useState('Get My Invitation')

  function resetField() {
    document.getElementById("email").reset();
  }

  function getData(value) {
    setEmail(value.target.value);

    setBackground("bg-relectr-grey");

    setErrorVisibility("invisible");

    setErrorText("Please fill out this field!");
  }

  function validateData() {
    setButtonText('Loading...')
    if (validator.isEmpty(email, { ignore_whitespace: true })) {
      setBackground("bg-relectr-secondary-red");
      setErrorVisibility("");
      setErrorText("Please fill out this field!");

    } else {
      if (validator.isEmail(email)) {

        const header = {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_SENDINBLUE_API.toString(),
        };

        axios
          .post(
            "https://api.sendinblue.com/v3/contacts",
            {
              email: email,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "api-key": process.env.NEXT_PUBLIC_SENDINBLUE_API.toString(),
              },
            }
          )
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              // Show success popups
              setModalType("success");
              setModalVisibility("");
            } else if (res.status == 400){
              // Show failed popoups
              setModalType("error");
              setModalVisibility("");
            }
          })
          // Catch and log the error
          .catch((err) => {
            setModalType("error")
            setModalVisibility("")
            console.log(err);
          });

        // If the input is not aempty but not a valid email address
      } else {
        // Change text field's background color to error red
        setBackground("bg-relectr-secondary-red");
        // Set the error text to the following
        setErrorText("Please input a valid email address!");
        // Show error message (to hide = "invisible")
        setErrorVisibility("");
      }
    }
  }
  // Below is the comopnenets
  return (
    <>
      {modalType == "success" ? (
        // Success Modal
        <Modal
          modalVisibility={modalVisibility}
          title="Email Added!"
          text="Thank you! You will be noticed via email for any updates in the future."
          buttonText="OK"
          buttonColor="bg-relectr-secondary-blue"
          onClick={() => {
            resetField();
            setButtonText('Get My Invitation')
            setModalVisibility("hidden");
          }}
        />
      ) : (
        // Failed Modal
        <Modal
          modalVisibility={modalVisibility}
          title="Oops! Something's Wrong!"
          text="There are some problems while adding your email. Please try again."
          buttonText="Try Again"
          buttonColor="bg-relectr-red"
          onClick={() => {
            resetField();
            setButtonText('Get My Invitation')
            setModalVisibility("hidden");
          }}
        />
      )}

      {/* Logo on Navigation bar */}
      <div className="text-center pt-8 mb-24">
        <a href="/">
          <img src="/logo.png" alt='flowday-logo' className='mx-auto' />
        </a>
      </div>

      {/* Text stuff */}
      <div className="mb-16 text-center">
        <div>
          <h3 className="font-bold text-xl text-relectr-normal-text mb-2.5">
            WE'RE STILL
          </h3>
        </div>
        <div>
          <h1 className="font-bold text-6xl md:text-7xl text-relectr-primary-blue mb-8">
            Cooking Our Website!
          </h1>
        </div>
        <div>
          <p className="font-normal text-l text-relectr-normal-text">
            Enjoy 10% commission when you refferal make a transfer/trade.
            <br className="hidden md:block" />
            We’ll be launching our website very very soon. Stay tuned!!!
          </p>
        </div>
      </div>

      {/* Field form stuff */}
      <div className="mx-auto w-max mb-24">
        <div>
          <form id="email">
            <input
              type="text"
              name="email"
              placeholder="Your email"
              autoComplete="off"
              required
              className={`${background} px-4 pt-3 pb-2.5 mr-2 lg:w-80 xl:w-80 2xl:w-80 md:w-64 rounded outline-none text-relectr-normal-text`}
              onChange={getData}
            />
            <Button
              type="button"
              text={ buttonText }
              color='bg-relectr-secondary-blue'
              // When this button is clicked, it triggers the validateData() function
              onClick={() => {
                validateData();
              }}
            />
          </form>
        </div>
        <div className="mt-1">
          <p className={`${errorVisibility} text-relectr-red text-sm`}>
            {/* The error text */}
            {errorText}
          </p>
        </div>
      </div>

      {/* Footer stuff */}
      <div className="text-center pb-12">
        <Social
          src="/instagram.svg"
          alt="Instagram"
          link="https://instagram.com/flowdayapp"
        />
        <Social
          src="/twitter.svg"
          alt="Twitter"
          link="https://twitter.com/flowdayapp"
        />
        <Social
          src="/linkedin.svg"
          alt="LinkedIn"
          link="https://linkedin.com/company/flowdayapp"
        />
        <Social
          src="/github.svg"
          alt="Facebook"
          link="https://facebook.com/devrealsolomon"
        />
        <Social
          src="/email.svg"
          alt="Email"
          link="mailto:businessmichaelamanso@gmail.com"
        />
      </div>
    </>
  );
}