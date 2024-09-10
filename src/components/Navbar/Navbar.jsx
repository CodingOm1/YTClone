import React, { useState } from "react";
import "./Navbar.css";
import { MdOutlineMenu } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { BiVideoPlus } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { assets } from "../../assets/main";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleNewVideoClick = () => {
    navigate('/create'); // Navigates to the CreateVideo component
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="navbar">
      <div className="left_nav">
        <span id="bar_span">
          <MdOutlineMenu id="bar" />
        </span>
        <div className="logo">
          <img src={assets.Logo} onClick={handleNavigation} alt="Error to load logo" />
          <span>IN</span>
        </div>
      </div>
      <div className="search_field">
        <div className="field">
          <FiSearch id="icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="srh_btn" title="Search" onClick={handleSearch}>
          <FiSearch id="icon" />
        </div>
      </div>
      <div className="right_nav">
        <BiVideoPlus id='icon' onClick={handleNewVideoClick} />
        <IoMdNotificationsOutline id='icon' />
        <div className="profile">
          <img src={assets.default_avatar} alt="Err to load profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
