import React from 'react';
import { Typography, List, Avatar } from 'antd';
import { candidates } from './fixtures';

const { Title } = Typography;

export const Candidates: React.FunctionComponent<{county: string, selectedCandidate: string, setSelectedCandidate: (name: string) => void}> = ({county, selectedCandidate, setSelectedCandidate}) => {

    return(
        <>
        <Title level={3}>{`Alegeți unul din candidații pentru județul ${county}`}</Title>
        <List itemLayout="horizontal">
            {candidates.map((candidate) => (
                <List.Item 
                    onClick={() => setSelectedCandidate(candidate.name)} 
                    style={{paddingLeft: '15px', cursor: 'pointer', background: selectedCandidate === candidate.name ? 'rgba(0, 0, 0, 0.04)' : 'unset'}}
                >
                    <List.Item.Meta 
                        title={candidate.name}
                        avatar={<Avatar src={candidate.imageUrl} />}
                        description={`Vârstă: ${candidate.age}`}
                    />
                </List.Item>
            ))}
        </List>
        </>
    );
};