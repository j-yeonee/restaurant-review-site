import styled from "styled-components";
import { Card, Button } from "../../../../shared/components/styles/UIElements";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useContext, useCallback } from "react";
import { Navigation } from "swiper/modules";
import { LocationContext } from "../../../../shared/components/context/LocationContext";

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

const CategoryItem = () => {
  const { state } = useContext(LocationContext);
  const { sid, sig, emd } = state;

  const [categoryData, setCategoryData] = useState();

  // 랜덤 이미지 경로
  const getRandomImagePath = () => {
    const randomImageNumber = Math.floor(Math.random() * 30) + 1;
    return `/${randomImageNumber}.jpeg`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
      const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

      try {
        const results = await Promise.all(
          dummyData.map(async (item) => {
            const { category, id, icon } = item;
            const query = `${sid} ${sig} ${emd} ${category} 맛집`;
            const url = `/v1/search/local.json?display=5&start=1&sort=random&query=${query}`;

            const response = await axios.get("/n_api" + url, {
              headers: {
                "X-Naver-Client-Id": client_id,
                "X-Naver-Client-Secret": client_secret,
              },
            });

            return { category, id, icon, items: response.data.items };
          })
        );
        setCategoryData(results);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [sid, sig, emd]);

  console.log(categoryData);

  return (
    <>
      {categoryData && (
        <>
          {categoryData.map((categoryItemPromise) => {
            // 각 Promise 객체를 기다립니다.
            return (
              <Card key={categoryItemPromise.id}>
                <CategoryInfo>
                  <div>
                    {categoryItemPromise.icon} {categoryItemPromise.category}
                  </div>
                  <div>
                    <span>
                      {sid} {sig} {emd}
                    </span>
                    추천 맛집
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
                    {categoryItemPromise.items &&
                      categoryItemPromise.items.map((item) => (
                        <SwiperSlide key={item.title}>
                          <div className="imgBox">
                            <img src={`/assets${getRandomImagePath()}`} />
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
              </Card>
            );
          })}
        </>
      )}
    </>
  );
};

export default CategoryItem;

// ========================= 수정 전 ================================

// const CategoryItem = () => {
//   const { state } = useContext(LocationContext);
//   const { sid, sig, emd } = state;

//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
//       const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

//       const query = `${sid} ${sig} ${emd} 파스타 맛집`;
//       const url = `/v1/search/local.json?display=5&start=1&sort=random&query=${query}`;

//       try {
//         const response = await axios.get("/n_api" + url, {
//           headers: {
//             "X-Naver-Client-Id": client_id,
//             "X-Naver-Client-Secret": client_secret,
//           },
//         });
//         const data = response.data.items;

//         setCategory(data);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     fetchData();
//   }, [sid, sig, emd]);

//   console.log(category);

//   return (
//     <>
//       {dummyData.map((item) => (
//         <Card key={item.id}>
//           <CategoryInfo>
//             <div>
//               {item.icon} {item.category}
//             </div>
//             <div>
//               <span>
//                 {sid} {sig} {emd}
//               </span>
//               추천 맛집
//             </div>
//             <Button>자세히보기</Button>
//           </CategoryInfo>
//           <RestaurantList>
//             <Swiper
//               modules={[Navigation]}
//               spaceBetween={50}
//               slidesPerView={4}
//               navigation={{
//                 nextEl: ".swiper-button-next",
//                 prevEl: ".swiper-button-prev",
//               }}
//             >
//               {category &&
//                 category.map((item) => (
//                   <SwiperSlide key={item.title}>
//                     <div>
//                       <img src="/assets/img01.jpg" />
//                     </div>
//                     <div>
//                       {item.title.replace(
//                         /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC01-\uD7A3]+/g,
//                         ""
//                       )}
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               <div className="swiper-button-next"></div>
//               <div className="swiper-button-prev"></div>
//             </Swiper>
//           </RestaurantList>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default CategoryItem;
