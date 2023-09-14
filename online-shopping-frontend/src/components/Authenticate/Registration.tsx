import { ChangeEvent, useEffect, useState } from "react";
import { RiFileUserFill } from "react-icons/ri";
import User from "../../model/User";
import validator from "validator";
import userService from "../../services/user-service";
import { useNavigate } from "react-router-dom";
import authGuardService from "../../services/auth-guard-service";
import Swal from "sweetalert2";
import { FaUserPlus } from "react-icons/fa";

const Registration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authGuardService.isUserLoggedIn()) navigate("/profile");
  }, []);

  const [registerErrors, setRegisterErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    dateOfBirth: false,
    address: false,
    role: false,
    image: false,
  });

  const handleFileChange = (event: ChangeEvent) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        setRegisterInfo({ ...registerInfo, image: event.target.result });
      };
    } catch {
      setRegisterInfo({ ...registerInfo, image: "" });
    }
  };

  const [registerInfo, setRegisterInfo] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    dateOfBirth: "",
    address: "",
    role: "",
    image: "",
  });

  const validateRegister = () => {
    let usernameError = false;
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let nameError = false;
    let dateOfBirthError = false;
    let addressError = false;
    let roleError = false;
    let imageError = false;
    if (registerInfo.username.trim().length < 3) {
      usernameError = true;
    }
    if (!validator.isEmail(registerInfo.email)) {
      emailError = true;
    }
    if (registerInfo.password.trim().length < 6) {
      passwordError = true;
    }
    if (registerInfo.confirmPassword !== registerInfo.password) {
      confirmPasswordError = true;
    }
    if (registerInfo.name.trim().length === 0) {
      nameError = true;
    }
    if (registerInfo.dateOfBirth.length < 10) {
      dateOfBirthError = true;
    }
    if (registerInfo.address.trim().length < 6) {
      addressError = true;
    }
    if (registerInfo.role.length === 0) {
      roleError = true;
    }
    if (registerInfo.image.length === 0) {
      imageError = true;
    }
    setRegisterErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      name: nameError,
      dateOfBirth: dateOfBirthError,
      address: addressError,
      role: roleError,
      image: imageError,
    });

    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      nameError ||
      dateOfBirthError ||
      addressError ||
      roleError ||
      imageError
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateRegister()) {
      userService
        .create(registerInfo)
        .then((response) => {
          navigate("/login");
          Swal.fire({
            icon: "success",
            title: "Registration successful.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: error.response.data,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      console.log("NOT OK");
    }
  };

  return (
    <>
      <div className="container text-center">
  <div className="row justify-content-center">
    <div className="col-md-12">
      <div className="container">
        <br />
        <br />
        <h1 style={{ color: "#198754" }}>
          Register
          <FaUserPlus
            size="5%"
            color="#198754"
            style={{ marginLeft: "2%" }}
          />
        </h1>
        <br />
        <br />
        <br />
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            value={registerInfo.username}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                username: event.target.value,
              });
            }}
            id="username"
            type="text"
            className="form-control"
            style={{ borderColor: "#198754" }}
            placeholder="Username"
          />
          {registerErrors.username && (
            <p className="text-danger">
              Username must contain at least 3 characters
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            value={registerInfo.email}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                email: event.target.value,
              });
            }}
            id="email"
            type="email"
            className="form-control"
            style={{ borderColor: "#198754" }}
            placeholder="E-mail"
          />
          {registerErrors.email && (
            <p className="text-danger">E-mail is not valid</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={registerInfo.password}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                password: event.target.value.trim(),
              });
            }}
            id="password"
            type="password"
            className="form-control"
            style={{ borderColor: "#198754" }}
            placeholder="Password"
          />
          {registerErrors.password && (
            <p className="text-danger">
              Password must contain at least 6 characters
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={registerInfo.confirmPassword}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                confirmPassword: event.target.value.trim(),
              });
            }}
            id="confirmPassword"
            type="password"
            className="form-control"
            style={{ borderColor: "#198754" }}
            placeholder="Confirm Password"
          />
          {registerErrors.confirmPassword && (
            <p className="text-danger">Passwords don't match</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={registerInfo.name}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                name: event.target.value,
              });
            }}
            id="name"
            type="text"
            className="form-control"
            style={{ borderColor: "#198754" }}
            placeholder="Name"
          />
          {registerErrors.name && (
            <p className="text-danger">Name is required</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            value={registerInfo.dateOfBirth}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                dateOfBirth: event.target.value.trim(),
              });
            }}
            id="dateOfBirth"
            type="date"
            className="form-control"
            style={{ borderColor: "#198754" }}
          />
          {registerErrors.dateOfBirth && (
            <p className="text-danger">Date of birth is required</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            value={registerInfo.address}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                address: event.target.value,
              });
            }}
            id="address"
            type="text"
            className="form-control"
            style={{ borderColor: "#198754" }}
            placeholder="Address"
          />
          {registerErrors.address && (
            <p className="text-danger">
              Address must contain at least 6 characters
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            value={registerInfo.role}
            onChange={(event) => {
              setRegisterInfo({
                ...registerInfo,
                role: event.target.value.trim(),
              });
            }}
            className="form-select"
            aria-label=".form-select example"
            style={{ borderColor: "#198754" }}
          >
            <option value="">Open this select menu</option>
            <option value="admin">Administrator</option>
            <option value="salesman">Salesman</option>
            <option value="customer">Customer</option>
          </select>
          {registerErrors.role && (
            <p className="text-danger">Pick a user role</p>
          )}
        </div>
      </div>
    </div>
    <div className="col-md-12 text-center">
      <div className="mb-3">
        <img
          src={registerInfo.image}
          className="rounded mx-auto d-block"
          alt="IMAGE"
          height="300"
          width="300"
          style={{
            borderStyle: "solid",
            borderWidth: "5px",
            borderColor: "#198754",
          }}
        ></img>
      </div>
      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          Photo
        </label>
        <input
          className="form-control"
          type="file"
          id="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={handleFileChange}
          style={{ borderColor: "#198754" }}
        />
        {registerErrors.image && (
          <p className="text-danger">Upload your profile photo</p>
        )}
      </div>
      <div className="mb-3">
        <button
          className="btn btn-lg btn-success"
          onClick={handleSubmit}
          style={{ backgroundColor: "#198754" }}
        >
          Register
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Registration;
