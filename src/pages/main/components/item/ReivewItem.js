import styled from "styled-components";

export const ReviewBox = styled.div`
  display: flex;
  padding: 0.7em 1em;
`;

export const ReviewImg = styled.div`
  img {
    border-radius: 7px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ReviewInfo = styled.div`
  padding: 0 0.5em;
  flex: 1;

  p {
    font-size: 0.9em;
    color: #eeeeee;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    font-size: 0.8em;
  }

  div:first-child {
    font-weight: 700;
    color: #ed8b2e;
  }
`;

const ReviewItem = () => {
  return (
    <ReviewBox>
      <ReviewImg>
        <img src="https://via.placeholder.com/180X150" />
      </ReviewImg>
      <ReviewInfo>
        <h3>드디어 옥춘관 다녀왔음!</h3>
        <p>고대하던 옥춘관에 다녀왔습니다. 기대 안하고 갔는데...</p>
        <UserInfoContainer>
          <div>맛있는사람</div>
          <div>2023.11.7</div>
        </UserInfoContainer>
      </ReviewInfo>
    </ReviewBox>
  );
};

export default ReviewItem;
