import styled from "styled-components";

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
    padding: 0 7em 0 4.5em;
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
  return (
    <header>
      <div className="header-top mobile-hide">
        <div className="container">
          <div className="wrapper">
            <Logo>
              <span>맛집</span>연구소
            </Logo>
            <Search>
              <input type="search" placeholder="검색어를 입력하세요" />
              <button>검색</button>
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
