import React from 'react';
import { Grid, Checkbox, Paper, List, ListItem, FormControlLabel } from '@material-ui/core';
import style from './AddQuestion.scss';
import Title from '../../Utilities/UI/Title';

function ViewQuestion({ question }) {
  return (
    <>
      <Grid item xs={12}>
        <Paper className={`${style.fixedHeight} ${style.paper}`}>
          <Title variant="h6" gutterBottom>
            Question
          </Title>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <span />
              )}
              label={question.question}
              variant="outlined"
              value={question.question}
              size="small"
              className={style.field}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Title>
              Answers
            </Title>
          </Grid>
          <Grid item xs={12}>

            <List>
              {question.questionAnswers.map((answer) => (
                <ListItem key={answer.ansId}>
                  <Grid container>
                    <Grid item xs={10}>
                      <FormControlLabel
                        control={(
                          <span />
                        )}
                        label={answer.answer}
                        variant="outlined"
                        value={answer.answer}
                        size="small"
                        className={style.field}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Checkbox color="primary" checked={answer.isCorrect} disabled />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default ViewQuestion;
