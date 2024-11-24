import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContext";
import { toast } from "react-toastify";
import { apiUrl } from "../utils/constants";
import ConfirmPopup from "../components/ConfirmPopup";
import { Link, useNavigate } from "react-router-dom";

const ProfileDisplay = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profile = localStorage.getItem("profile");
        if (profile) {
          const savedProfile = JSON.parse(profile);
          if (savedProfile) {
            setProfile(savedProfile);
          } else {
            setLoading(true);
            if (apiUrl) {
              const response = await axios.get(apiUrl);
              setProfile(response.data);
              localStorage.setItem("profile", JSON.stringify(response.data));
            }
          }
        }
      } catch (error) {
        toast.error("Error fetching profile details");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setProfile]);

  const handleDelete = async () => {
    localStorage.removeItem("profile");
    setProfile({});

    try {
      if (apiUrl && profile && profile.id) {
        await axios.delete(`${apiUrl}/${profile.id}`);
        setProfile({});
        toast.success("Profile deleted successfully");
        setShowConfirmPopup(false);
        navigate("/profile-form");
      }
    } catch (error) {
      toast.error("Error in deleting profile");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (apiUrl && profile && profile.id) {
        const response = await axios.put(`${apiUrl}/${profile.id}`, profile);
        setProfile(response.data);
        localStorage.setItem("profile", JSON.stringify(response.data));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Error in updating profile. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="md:p-10 flex justify-center items-start">
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          {profile ? (
            <form className="md:w-1/2 lg:w-1/3 space-y-6 mt-10 border-2 rounded-md shadow-md p-6 lg:p-10">
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-slate-700 text-2xl">
                    {profile.name &&
                      profile.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={profile.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={profile.email}
                  readOnly
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
                  value={profile.age}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex justify-between gap-5">
                <button
                  type="button"
                  onClick={isEditing ? handleSave : handleEdit}
                  className="mt-4 text-sm md:text-base p-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmPopup(true)}
                  className="mt-4 text-sm md:text-base p-2 md:px-4 md:py-2 bg-slate-500 text-white rounded-md hover:bg-slate-700"
                >
                  Delete Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                to={"/profile-form"}
                className="font-semibold text-base w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
              >
                Profile not found. &nbsp;
                <span className="text-blue-800 underline">
                  Please create a new one.
                </span>
              </Link>
            </div>
          )}
        </>
      )}

      {showConfirmPopup && (
        <ConfirmPopup
          handleDelete={handleDelete}
          setShowConfirmPopup={setShowConfirmPopup}
        />
      )}
    </div>
  );
};

export default ProfileDisplay;
