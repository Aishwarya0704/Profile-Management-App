import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { toast } from "react-toastify";
import { apiUrl } from "../utils/constants";

interface FormI {
  name: string;
  email: string;
  age: number;
}
const ProfileForm = () => {
  const { setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormI>({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (apiUrl) {
        const response = await axios.post(apiUrl, formData);
        setProfile(response.data);
        localStorage.setItem("profile", JSON.stringify(response.data));
        toast.success("Profile saved successfully!");
        navigate(`/profile?name=${formData.name}&email=${formData.email}`);
      }
    } catch (error) {
      toast.error("Error saving profile. Please try again.");
    }
  };

  return (
    <div className="md:p-10 flex justify-center items-center">
      <form
        className="md:w-1/2 lg:w-1/3 mx-auto space-y-7 mt-10 border-2 rounded-md shadow-md p-6 lg:p-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-700 text-center mb-16">
          Add profile
        </h2>
        <div>
          <label className="block text-base font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-slate-700 mb-1">
            Age
          </label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
