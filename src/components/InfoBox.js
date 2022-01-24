import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const InfoBox = ({ cases, title, total }) => {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography
          className="infoBox_title"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>

        <Typography variant="body2" component="p">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
