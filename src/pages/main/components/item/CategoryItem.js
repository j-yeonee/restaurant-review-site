import styled from "styled-components";
import { Card, Button } from "../../../../shared/components/styles/UIElements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";

import dummyData from "../../../../dummyData";
import axios from "axios";
import "swiper/css/bundle";

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

  img {
    width: 150px;
    height: 150px;
    border-radius: 7px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white; /* 버튼 색상 설정 */
    font-size: 13px; /* 버튼 폰트 크기 설정 */
    background: rgba(0, 0, 0, 0.75); /* 배경색 설정 */
    border-radius: 100%;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #333333;
    }
  }

  .swiper-button-next {
    right: 10px; /
  }

  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 1em;
  }
`;

export const NextButton = styled.button``;

const CategoryItem = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
      const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
      const query = "서울 한식 맛집";

      const url = `/v1/search/local.json?display=5&start=1&sort=random&query=${query}`;

      try {
        const response = await axios.get("/n_api" + url, {
          headers: {
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret,
          },
        });
        const data = response.data.items;

        setData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      {dummyData.map((item) => (
        <Card key={item.id}>
          <CategoryInfo>
            <div>
              {item.icon} {item.category}
            </div>
            <div>
              <span>서울</span> 추천 맛집
            </div>
            <Button>자세히보기</Button>
          </CategoryInfo>
          <RestaurantList>
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={4}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            >
              {data &&
                data.map((item) => (
                  <SwiperSlide key={item.title}>
                    <div>
                      <img src="/assets/img01.jpg" />
                    </div>
                    <div>{item.title}</div>
                  </SwiperSlide>
                ))}
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </Swiper>
          </RestaurantList>
        </Card>
      ))}
    </>
  );
};

export default CategoryItem;
