import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export const RestaurantList = styled.div`
  display: flex;
  max-width: 700px;
  align-items: center;
  padding: 1.5em 3em;

  .imgBox {
    width: 150px;
    height: 150px;
    border-radius: 7px;

    img {
      width: 100%;
      height:100%;
      object-fit: cover;
      border-radius: 7px;
    }
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

const CategoryItemContent = ({ categoryItemPromise, randomImg }) => {
  return (
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
        {categoryItemPromise.items &&
          categoryItemPromise.items.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="imgBox">
                <img src={`/assets/${randomImg}.jpeg`} />
              </div>
              <div>
                {item.title.replace(
                  /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC01-\uD7A3]+/g,
                  ""
                )}
              </div>
            </SwiperSlide>
          ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </RestaurantList>
  );
};

export default CategoryItemContent;
