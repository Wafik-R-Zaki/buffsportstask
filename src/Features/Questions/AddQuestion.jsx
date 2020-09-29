import React, { useState } from 'react';
import {
  Grid, TextField, Checkbox, Paper, Button, List, ListItem, Typography,
  IconButton, Tooltip, Snackbar
} from '@material-ui/core';
import { AddCircleSharp, DeleteForever } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { SetSelectedQuestion, UpdateAnswerValue } from "../../actions";
import style from './AddQuestion.scss';
import Title from '../../Utilities/UI/Title';
import ConfirmDialog from './confirmAlert';
import AddAnswerDialog from './addNewAnswer';

const confirmMessage = "Are you sure you want to delete this answer?";
function AddQuestion({ question }) {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openNewAnswer, setOpenNewAnswer] = React.useState(false);

  const total = question.questionAnswers.length;
  const incorrect = question.questionAnswers.filter((value) => !value.isCorrect).length;
  const hasAnyEmptyAnswers = question.questionAnswers.some((value) => !value.answer);

  const checkValidation = (isChecked) => {
    if (isChecked && incorrect === 1) {
      setSnackbarMessage("you must have at least one incorrect answer!");
      setOpenSnackbar(true);
      return false;
    }
    if (!isChecked && (incorrect + 1) === total) {
      setSnackbarMessage("you must have at least one correct answer!");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    const newVal = { ...question, [e.target.id]: e.target.value };
    dispatch(SetSelectedQuestion(newVal));
  };
  const handleCheckChange = (e) => {
    if (!checkValidation(e.target.checked)) { return; }
    dispatch(UpdateAnswerValue({ ansId: e.target.value, isCorrect: e.target.checked }));
  };

  const handleAnswersChange = (e) => {
    dispatch(UpdateAnswerValue({ ansId: e.target.id, answer: e.target.value }));
  };

  const validateForm = question.question && incorrect && incorrect < total && !hasAnyEmptyAnswers;

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => { setOpenSnackbar(false); }}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={open}
        handleClose={() => setOpen(false)}
        message={confirmMessage}
      />
      <AddAnswerDialog
        open={openNewAnswer}
        handleClose={() => setOpenNewAnswer(false)}
      />
      <Grid item xs={12}>
        <Paper className={`${style.fixedHeight} ${style.paper}`}>
          <Title variant="h6" gutterBottom>
            Eidt Question
          </Title>
          <Grid item xs={12}>
            <TextField
              required
              error={!question.question}
              id="question"
              name="question"
              value={question.question}
              onChange={handleChange}
              label="Question"
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item container>
            <Grid item xs={10}>
              <Title>
                Answers
              </Title>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Add Answer">
                <IconButton color="primary" size="medium" onClick={() => { setOpenNewAnswer(true); }}>
                  <AddCircleSharp size="medium" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12}>

            <List>
              <listitem>
                <Grid item container>
                  <Grid item xs={10}>
                    <Typography color="primary">
                      Answer
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color="primary">
                      Is Correct
                    </Typography>
                  </Grid>
                </Grid>
              </listitem>
              {question.questionAnswers.map((answer) => (
                <ListItem key={answer.ansId} className={style.hoverClass}>
                  <Grid container>
                    <Grid item xs={1}>
                      <Tooltip title="Delete" className={style.hidebtn}>
                        <IconButton color="secondary" size="small" onClick={() => { setOpen(true); }}>
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        id={`${answer.ansId}`}
                        variant="outlined"
                        value={answer.answer}
                        size="small"
                        className={style.field}
                        onChange={handleAnswersChange}
                        required
                        error={!answer.answer}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Checkbox color="primary" onChange={handleCheckChange} checked={answer.isCorrect} value={answer.ansId} />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid xs={12} item>
            <Button id="btnSave" variant="contained" color="primary" disabled={!validateForm} onClick={() => { }}>
              Save Question
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default AddQuestion;
