import React from 'react';
import { Card, CardContent, List, ListItem } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import style from './Questions.css';

export default function QuestionsSkeleton() {
  return (
    <>
      <List>
        {Array.from(new Array(6)).map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index}>
            <Card className={` ${style.card}`}>
              <CardContent>
                {Array.from(new Array(4)).map((subItem, z) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Skeleton key={z} />
                ))}
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </>
  );
}
