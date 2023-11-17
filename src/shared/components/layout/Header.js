import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Logo = styled.div`
  font-size: 2.3em;
  font-family: "Do Hyeon", sans-serif;
  color: #46aa46;

  span {
    font-weight: bold;
  }
`;

export const Search = styled.form`
  width: 600px;
  position: relative;
  display: flex;
  input {
    background-color: #faf9f8;
    line-height: 3.25em;
    width: 100%;
    padding: 0 7em 0 1.3em;
    border: 0;
    outline: 0;
    border-radius: 7px;
  }

  button {
    font-family: inherit;
    background-color: #46aa46;
    color: white;
    position: absolute;
    right: 0;
    border: 0;
    outline: 0;
    height: 100%;
    padding: 0.5em 1em;
    border-radius: 0 7px 7px 0;
    cursor: pointer;
  }
`;

export const Auth = styled.div`
  ul {
    display: flex;
  }

  ul li {
    padding: 0.5em;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const searchContext = useContext(SearchContext);
  const { setSearchData } = searchContext.actions;
  const { searchData } = searchContext.state;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
  const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  const fetchData = () => {
    try {
      const results = async () => {
        const query = `${inputValue} 맛집`;
        const url = `/v1/search/local.json?display=5&start=1&sort=random&query=${query}`;

        const response = await axios.get("/n_api" + url, {
          headers: {
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret,
          },
        });

        return { items: response.data.items };
      };

      setSearchData(results);

      navigate("/search");
    } catch (e) {
      console.log(e);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    console.log("Form Submitted");
  };

  console.log("검색어 값:", inputValue);
  console.log(searchData);

  return (
    <header>
      <div className="header-top mobile-hide">
        <div className="container">
          <div className="wrapper">
            <Logo>
              <span>맛집</span>연구소
            </Logo>
            <Search onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="검색어를 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
              />

              <button type="submit">검색</button>
            </Search>
            <Auth>
              <ul>
                <li>로그인</li>
                <li>회원가입</li>
              </ul>
            </Auth>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
