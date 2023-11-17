import styled from "styled-components";
import { getRandomImagePath } from "../../shared/util/getRandomImagePath";
import { LocationContext } from "../../shared/context/LocationContext";
import { CategoryContext } from "../../shared/context/CategoryContext";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ListMap from "./components/ListMap";

export const Section = styled.main`
  background-color: #f5f7f6;
  height: auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em;
  border-bottom: 1px solid #eeeeee;
`;

export const Category = styled.div`
  width: 30%;
  background-color: white;
  border-radius: 7px;
`;

export const CategoryInfo = styled.div`
  display: flex;
  padding: 1em 1em;
  border-top: 1px solid #eeeeee;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 7px;
  }
`;

const ListPage = () => {
  const categoryContext = useContext(CategoryContext);
  const locationContext = useContext(LocationContext);

  const { sid, sig, emd } = locationContext.state;
  const { categoryData } = categoryContext.state;
  const { id } = useParams();

  console.log("categoryData:", categoryData);
  console.log("id:", id);

  const randomImagePath = getRandomImagePath();

  const detailData = categoryData.find(
    (categoryItemPromise) => categoryItemPromise.id === parseInt(id)
  );
  console.log("detailData:", detailData);

  return (
    <Section>
      <div className="container">
        <Container>
          <Category>
            <h4>
              {sid} {sig} {emd} #{detailData && detailData.category} 맛집
            </h4>
            {detailData &&
              detailData.items.map((data) => (
                <CategoryInfo key={data.id}>
                  <div>
                    <img src={`/assets/${randomImagePath}.jpeg`} />
                  </div>
                  <div>
                    <div>
                      {data.title.replace(
                        /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC01-\uD7A3]+/g,
                        ""
                      )}
                    </div>
                    <div>{data.category}</div>
                    <div>{data.address}</div>
                  </div>
                </CategoryInfo>
              ))}
          </Category>
          <ListMap geoData={detailData} level={13} />
        </Container>
      </div>
    </Section>
  );
};

export default ListPage;
