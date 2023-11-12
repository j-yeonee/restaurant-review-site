import styled from "styled-components";
import { Card, Button } from "../../../../shared/components/styles/UIElements";

export const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  background-color: #eeeeee;

  span {
    color: #ed8b2e;
    font-weight: 800;
  }
`;

export const RestaurantList = styled.div`
  display: flex;
  max-width: 700px;
  align-items: center;
  padding: 1.5em 3em;
`;

export const RestaurantItem = styled.div`
  margin-right: 1.5em;
`;

const CategoryItem = () => {
  return (
    <Card>
      <CategoryInfo>
        <div>#카테고리</div>
        <div>
          <span>서울</span> 추천 맛집
        </div>
        <Button>자세히보기</Button>
      </CategoryInfo>
      <RestaurantList>
        <RestaurantItem>
          <div>
            <img src="https://via.placeholder.com/150" />
          </div>
          <div>옥춘관</div>
        </RestaurantItem>
        <RestaurantItem>
          <div>
            <img src="https://via.placeholder.com/150" />
          </div>
          <div>옥춘관</div>
        </RestaurantItem>
        <RestaurantItem>
          <div>
            <img src="https://via.placeholder.com/150" />
          </div>
          <div>옥춘관</div>
        </RestaurantItem>
      </RestaurantList>
    </Card>
  );
};

export default CategoryItem;
