import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { refreshContext } from "../context";

function Form() {
  const { refresh, setRefresh } = refreshContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    domain: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    domain: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    });

    if (form.phone.trim() && !/^\d{10}$/.test(form.phone.trim())) {
      validationErrors.phone = "Phone number should be 10 digits.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let addUser = await axios.post("https://www.broto.dreamhome.cloud/addUser", form);
      setRefresh(!refresh);
      toast.success("Successfully inserted");
      setForm({
        name: "",
        email: "",
        phone: "",
        batch: "",
        domain: "",
      });
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center pb-16">
        <div className="flex flex-col bg-black rounded-lg p-4 shadow-sm w-3/5 py-6">
          <h2 className="text-white font-bold text-lg my mt-4">
            Add Student details
          </h2>

          <div
            className={`mt-3 rounded-md border-white ${
              errors.name && "border-red-500 "
            }`}
          >
            <input
              style={{ border: "1px solid gray" }}
              placeholder="Full Name"
              onChange={handleChange}
              value={form.name}
              className={`w-full border-solid bg-black rounded-md border-white text-white px-2 py-1 ${
                errors.name && "bg-red-800"
              }`}
              type="text"
              id="name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs ">{errors.name}</p>
            )}
          </div>

          <div
            className={`mt-3 rounded-md border-white ${
              errors.email && "border-red-500"
            }`}
          >
            <input
              style={{ border: "1px solid gray" }}
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              className={`w-full bg-black rounded-md border-white text-white px-2 py-1 ${
                errors.email && "bg-red-800"
              }`}
              type="email"
              id="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div
            className={`mt-3 rounded-md border-white ${
              errors.phone && "border-red-500"
            }`}
          >
            <input
              style={{ border: "1px solid gray" }}
              placeholder="Phone Number"
              onChange={handleChange}
              value={form.phone}
              className={`w-full bg-black rounded-md border-white text-white px-2 py-1 ${
                errors.phone && "bg-red-800"
              }`}
              type="tel"
              id="phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div
            className={`mt-3 rounded-md border-white ${
              errors.batch && "border-red-500"
            }`}
          >
            <input
              style={{ border: "1px solid gray" }}
              placeholder="Batch"
              onChange={handleChange}
              value={form.batch}
              className={`w-full bg-black rounded-md border-white text-white px-2 py-1 ${
                errors.batch && "bg-red-800"
              }`}
              type="text"
              id="batch"
            />
            {errors.batch && (
              <p className="text-red-500 text-xs mt-1">{errors.batch}</p>
            )}
          </div>

          <div
            className={`mt-3 rounded-md border-white ${
              errors.domain && "border-red-500"
            }`}
          >
            <input
              style={{ border: "1px solid gray" }}
              placeholder="Domain"
              onChange={handleChange}
              value={form.domain}
              className={`w-full bg-black rounded-md border-white text-white px-2 py-1 ${
                errors.domain && "bg-red-800"
              }`}
              type="text"
              id="domain"
            />
            {errors.domain && (
              <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-4 py-1" // Adjusted padding here
              type="submit"
            >
              <span className="relative z-10 text-green-500 group-hover:text-white  duration-500">
                {" "}
                Submit
              </span>
              <span className="absolute w-full h-full bg-green-500 -left-16 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-green-500 -right-16 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
