import React, { useEffect, useState } from "react";
import { Typography, List, Avatar } from "antd";
import { GET } from "../../services/http.client";

const { Title } = Typography;

export const Candidates: React.FunctionComponent<{
  county: string;
  selectedCandidate: string;
  setSelectedCandidate: (name: string) => void;
}> = ({ county, selectedCandidate, setSelectedCandidate }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = async () => {
      const response = await GET(`candidates?countyName=${county}`, {});
      const json = await response.json();
      setCandidates(json);
    };

    getCandidates();
  }, []);

  return (
    <>
      <Title
        level={3}
      >{`Alegeți unul din candidații pentru județul ${county}`}</Title>

      {candidates ? (
        <List itemLayout="horizontal">
          {candidates.map((candidate) => (
            <List.Item
              onClick={() => setSelectedCandidate(candidate)}
              key={candidate.id}
              style={{
                paddingLeft: "15px",
                cursor: "pointer",
                background:
                  selectedCandidate === candidate.name
                    ? "rgba(0, 0, 0, 0.04)"
                    : "unset",
              }}
            >
              <List.Item.Meta
                title={candidate.name}
                avatar={<Avatar src={candidate.imageURL} />}
                description={
                  <ul>
                    <li>Vârstă: {candidate.age}</li>
                    <li>Adresă: {candidate.address}</li>
                    <li>Gen: {candidate.gender}</li>
                  </ul>
                }
              />
            </List.Item>
          ))}
        </List>
      ) : (
        "Vă rugăm așteptați..."
      )}
    </>
  );
};
