import React from 'react';
import { Card } from 'antd';

export const ConfirmationScreen: React.FunctionComponent<{county: string, candidate: string}> = ({county, candidate}) => {

    return(
        <Card 
            bordered={false} 
            style={{ width: 200, marginTop: '15px', paddingTop: '30px' }}
            cover={<img src="https://i.ibb.co/JFmCbXp/votat-stamp.jpg" alt="votat-stamp" />}
        >
            <p>Județ: {county}</p>
            <p>Candidatul: {candidate}</p>
        </Card>
    );
};