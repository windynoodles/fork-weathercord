"use client";

import Modal from "../Modal/Modal";

const SignUpModal = () => {
  return (
    <Modal>
      <img className="w-12 m-auto" src="/Weathercord.svg" alt="Weathercord" />
      <h1 className="text-center">Join Weathercord</h1>
      <form>
        <label>
          <div>Username</div>
          <input type="text" />
        </label>
        <label>
          <div>Password</div>
          <input type="password" />
        </label>
        <label>
          <div>Re-type Password</div>
          <input type="password" />
        </label>
        <input type="submit" value="Create Account" />
      </form>
    </Modal>
  );
};

export default SignUpModal;
