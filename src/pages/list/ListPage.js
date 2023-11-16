import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Map from "./Map";
import { LocationContext } from "../../shared/components/context/LocationContext";
import { CategoryContext } from "../../shared/components/context/CategoryContext";

export const Section = styled.main`
  background-color: #f5f7f6;
  height: auto;
`;

export const ListMap = styled.div`
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

  const detailData = categoryData.find(
    (categoryItemPromise) => categoryItemPromise.id === parseInt(id)
  );
  console.log("detailData:", detailData);

  return (
    <Section>
      <div className="container">
        <ListMap>
          <Category>
            <h4>
              {sid} {sig} {emd} #{detailData && detailData.category} 맛집
            </h4>
            {detailData &&
              detailData.items.map((data) => (
                <CategoryInfo key={data.id}>
                  <div>
                    <img src="http://placehold.it/150X150" />
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
          <Map detailData={detailData} />
        </ListMap>
      </div>
    </Section>
  );
};

export default ListPage;
